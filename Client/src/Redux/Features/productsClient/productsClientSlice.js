import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    status: 'idle',
    allProducts: [],
    error: null,
}


export const getAllProducts = createAsyncThunk(
    'productsClient/getAllProducts',
    async ({ token }) => {

        try {
            const response = await axios('/client/allproducts', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('getAllProducts OK', response.data)

            return response.data;

        } catch (error) {
            console.log('ERRORR GETALLPRODUCTS REDUX', error)
            throw error;
        }
    }
)

const productsClientSlice = createSlice({
    name: 'productsClient',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.allProducts = action.payload;
                state.error = null;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message
            })

    }
})

export default productsClientSlice.reducer;