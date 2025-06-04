import  {createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';


 export const fetchUserProfile = createAsyncThunk('user/fetchUserProfile',
     async (token, thunkAPI) => {
         console.log('Thunk received token:', token); // Add this
        try {
             const profile = await axios.get('http://localhost:5000/users/profile', {
        headers: { Authorization: `Bearer ${token}` }
        
      });
      return profile.data.user;
        } catch (error) {
            
          return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch profile');

        }

    }
  );

const initialState = {
    profile:null,
    status: 'idle',
    error: null
}

const userSlice = createSlice({
    name: 'profile',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
    }
});

export default userSlice.reducer;