import {configureStore} from '@reduxjs/toolkit';
import authSlice from '../Redux/authSlice';
import blogReducer from '../Redux/blogSlice'; // Import the new blogSlice


 const store = configureStore({
    reducer: {
        user: authSlice,
        blogs: blogReducer, // Add blog reducer here
    }
});

export default store;

