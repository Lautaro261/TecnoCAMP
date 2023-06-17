import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    allCategories: [],
    status: 'idle',
    error: null
};

export const getAllCategories = createAsyncThunk(
    'clientCategories/getAllCategories',
    async () => {
        try {
            const response = await axios.get('/client/allcategories');
            return response.data;
        } catch(error) {
            console.error(error.message);
            throw error;
        }
    }
);

const clientCategoriesSlice = createSlice({
    name: 'clientCategories',
    initialState,
    extraReducers: (builder) => {
        builder

            .addCase(getAllCategories.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getAllCategories.fulfilled, (state, action) => {
                state.status = 'succeeded',
                state.allCategories = action.payload,
                state.error = null
            })
            .addCase(getAllCategories.rejected, (state, action) => {
                state.status = 'rejected',
                state.error = action.error.message
            })

    }
});


export default clientCategoriesSlice.reducer;
