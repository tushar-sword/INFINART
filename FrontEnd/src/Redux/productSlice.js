import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Get base URL from environment variable
const API_URL = "http://localhost:5000/products";

// Async thunk to fetch all products
export const fetchProducts = createAsyncThunk("products/fetchAll", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

// Sort options
const updatedSortOptions = [
  { label: 'Relevance', value: 'default', direction: 'asc' },
  { label: 'Lowest Price', value: 'price', direction: 'asc' },
  { label: 'Highest Price', value: 'price', direction: 'desc' },
  { label: 'Top Customer Reviews', value: 'rating', direction: 'desc' },
  { label: 'Most Recent', value: 'id', direction: 'desc' },
];

// Initial state
const initialState = {
  products: [],
  filteredProducts: [],
  sortOption: updatedSortOptions[0],
  filterOptions: {
    inStock: false,
    priceRange: [0, 2000],
    categories: [],
    subcategories: [],
  },
  updatedSortOptions,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSortOption(state, action) {
      state.sortOption = action.payload;
    },
    setFilterOptions(state, action) {
      state.filterOptions = { ...state.filterOptions, ...action.payload };
    },
    resetFilters(state) {
      state.filterOptions = initialState.filterOptions;
      state.sortOption = updatedSortOptions[0];
    },
    filterProducts(state) {
      const { products, filterOptions, sortOption } = state;
      let filtered = [...products];

      if (filterOptions.inStock) {
        filtered = filtered.filter(p => p.inStock === true);
      }

      const [minPrice, maxPrice] = filterOptions.priceRange;
      filtered = filtered.filter(p => p.price >= minPrice && p.price <= maxPrice);

      if (filterOptions.categories.length > 0) {
        const selected = filterOptions.categories.map(c => c.toLowerCase());
        filtered = filtered.filter(p =>
          selected.includes(p.category?.toLowerCase())
        );
      }

      if (filterOptions.subcategories.length > 0) {
        filtered = filtered.filter(p =>
          filterOptions.subcategories.includes(p.subcategory)
        );
      }

      if (sortOption?.value !== 'default') {
        const { value, direction } = sortOption;

        if (value === 'name') {
          filtered.sort((a, b) =>
            direction === 'asc'
              ? a.name.localeCompare(b.name)
              : b.name.localeCompare(a.name)
          );
        } else {
          filtered.sort((a, b) =>
            direction === 'asc'
              ? a[value] - b[value]
              : b[value] - a[value]
          );
        }
      }

      state.filteredProducts = filtered;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.filteredProducts = action.payload; // initial view
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSortOption, setFilterOptions, resetFilters, filterProducts } = productSlice.actions;
export default productSlice.reducer;
