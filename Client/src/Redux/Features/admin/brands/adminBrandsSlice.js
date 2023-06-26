import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    allBrands: [],
    status: 'idle',
    error: null
};

export const getAllBrands = createAsyncThunk(
    'adminBrands/getAllBrands',
    async (adminToken) => {
        try {
            const response = await axios.get('/admin/allbrands', {
                headers: {
                    Authorization: `Bearer ${ adminToken }`
                }
            });
            return response.data;
        } catch(error) {
            console.error(error.message);
            throw error;
        }
    }
);

const adminBrandsSlice = createSlice({
    name: 'adminBrands',
    initialState,
    extraReducers: (builder) => {
        builder

            .addCase(getAllBrands.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getAllBrands.fulfilled, (state, action) => {
                state.status = 'succeeded',
                state.allBrands = action.payload
            })
            .addCase(getAllBrands.rejected, (state, action) => {
                state.status = 'rejected',
                state.error = action.error.message
            })

    }
});


export default adminBrandsSlice.reducer;