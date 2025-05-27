import React, { useState } from 'react';
import { useProducts } from '../Context/ProductContext';
import ProductCard from '../ProductCard/ProductCard';
import FilterDrawer from '../FilterDrawer/FilterDrawer';
import SortDropdown from '../SortDropdown/SortDropdown';
import { SlidersHorizontal } from 'lucide-react';
import { Button } from '../../../../../ui/Button';
import './ShopM.css';





const Shop = () => {
  const { 
    filteredProducts, 
    sortOption, 
    setSortOption,
    filterOptions,
    updateFilterOptions,
    updatedSortOptions 
  } = useProducts();
  
  const productCount = filteredProducts ? filteredProducts.length : 0;
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);

  const handleSort = (option) => {
    if (setSortOption) {
      setSortOption(option);
    }
  };

  const handleFilterChange = (newFilters) => {
    if (updateFilterOptions) {
      updateFilterOptions(newFilters);
    }
  };

  const sortOptions = updatedSortOptions || [
    { label: 'Default', value: 'default', direction: 'asc' },
    { label: 'Price (Low to High)', value: 'price', direction: 'asc' },
    { label: 'Price (High to Low)', value: 'price', direction: 'desc' },
    { label: 'Top Customer Rating', value: 'rating', direction: 'desc' },
    { label: 'Most Recent', value: 'id', direction: 'desc' },
    { label: 'Discount', value: 'discountPercentage', direction: 'desc' }
  ];

  return (
    <div className="shop-container">
      <h1 className="shop-title">Our Craft Kits</h1>
      
      <div className="shop-toolbar">
        <div className="filter-button-container">
          <Button 
            variant="outline" 
            className="filter-button"
            onClick={() => setShowFilterDrawer(true)}
          >
            <SlidersHorizontal size={16} className="filter-icon" />
            <span>Filters</span>
          </Button>
        </div>
        
        <div className="sort-container">
          <span className="results-count">
            {productCount} results
          </span>
          
          <SortDropdown 
            options={sortOptions}
            selectedOption={sortOption || sortOptions[0]}
            onOptionSelect={handleSort}
          />
        </div>
      </div>
      
      <FilterDrawer 
        open={showFilterDrawer} 
        onClose={() => setShowFilterDrawer(false)}
        filterOptions={filterOptions}
        onFilterChange={handleFilterChange}
      />
      
      <div className="products-container">
        {!filteredProducts || filteredProducts.length === 0 ? (
          <div className="no-products">
            <h3>No products match your filters</h3>
            <p>Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;