import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const id = action.payload;
      if (state.items.includes(id)) {
        state.items = state.items.filter(item => item !== id);
      } else {
        state.items.push(id);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
