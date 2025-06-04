import {configureStore} from '@reduxjs/toolkit';
import authSlice from '../Redux/authSlice';
import blogReducer from '../Redux/blogSlice'; // Import the new blogSlice
import userSlice from  '../Redux/userSlice';
import productReducer from "../Redux/productSlice"
import favoritesReducer from "../Redux/favoritesSlice"
import cartReducer from "../Redux/cartSlice"


 const store = configureStore({
    reducer: {
        user: authSlice,
        blogs: blogReducer, // Add blog reducer here
        profile : userSlice,
         products: productReducer,
         favorites: favoritesReducer,
    cart: cartReducer,
    }
});

export default store;

