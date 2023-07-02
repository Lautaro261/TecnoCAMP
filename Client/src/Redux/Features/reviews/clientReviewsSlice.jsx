import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    createdReviewResponse: [],
    allReviewsByProductId: [],
    status: 'idle',
    error: null
};

export const createReview = createAsyncThunk(
    'clientReviews/createReview',
    async ({ values, token }) => {
        try {
            const response = await axios.post('/client/review', values, {
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

export const getAllReviewsByProductId = createAsyncThunk(
    'clientReviews/getAllReviewsByProductId',
    async (productId) => {
        try {
            const response = await axios.get(`/client/reviews?productId=${ productId }`);
            return response.data;
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }
);

const clientReviewsSlice = createSlice({
    name: 'clientReviews',
    initialState,
    extraReducers: (builder) => {
        builder

            .addCase(createReview.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(createReview.fulfilled, (state, action) => {
                state.status = 'succeeded',
                state.createdReviewResponse = action.payload
            })
            .addCase(createReview.rejected, (state, action) => {
                state.status = 'rejected',
                state.error = action.error.message 
            })

            .addCase(getAllReviewsByProductId.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getAllReviewsByProductId.fulfilled, (state, action) => {
                state.status = 'succeeded',
                state.allReviewsByProductId = action.payload
            })
            .addCase(getAllReviewsByProductId.rejected, (state, action) => {
                state.status = 'rejected',
                state.error = action.error.message 
            })
    }
});

export default clientReviewsSlice.reducer;