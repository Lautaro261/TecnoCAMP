import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    allBrands: [],
    status: 'idle',
    error: null
};

export const getAllBrands = createAsyncThunk(
    'clientBrands/getAllBrands',
    async () => {
        try {
            const response = await axios.get('/client/allbrands');
            return response.data;
        } catch(error) {
            console.error(error.message);
            throw error;
        }
    }
);

const clientBrandsSlice = createSlice({
    name: 'clientBrands',
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

export default clientBrandsSlice.reducer;
