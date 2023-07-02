import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    allReviews: [],
    status: 'idle',
    error: null
};

export const getAllReviews = createAsyncThunk(
    'adminReviews/getAllReviews',
    async (token) => {
        try {
            const response = await axios.get('/admin/allReviews', {
                headers: {
                    Authorization: `Bearer ${ token }`
                }
            });
            return response.data;
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }
);

const adminReviewsSlice = createSlice({
    name: 'adminReviews',
    initialState,
    extraReducers: (builder) => {
        builder

            .addCase(getAllReviews.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getAllReviews.fulfilled, (state, action) => {
                state.status = 'succeeded',
                state.allReviews = action.payload
            })
            .addCase(getAllReviews.rejected, (state, action) => {
                state.status = 'rejected',
                state.error = action.error.message 
            })
    }
});

export default adminReviewsSlice.reducer;