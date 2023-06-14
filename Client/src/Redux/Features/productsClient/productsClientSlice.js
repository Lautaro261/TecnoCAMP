import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    status: 'idle',
    allProducts: [],
    productDetails: {},
    error: null,
}


export const getAllProducts = createAsyncThunk(
    'productsClient/getAllProducts',
    async ({ token }) => {

        try {
            const response = await axios('http://localhost:3001/client/allproducts', {
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
export const getProductDetails = createAsyncThunk(
    'productsClient/getProductDetails',
    async ({ token }) => {

        try {
            const response = await axios('http://localhost:3001/client/product', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('getProductDetails OK', response.data)

            return response.data;

        } catch (error) {
            console.log('ERRORR GETPRODUCTDETAILS REDUX', error)
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
            
            .addCase(getProductDetails.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getProductDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.productDetails= action.payload;
                state.error = null;
            })
            .addCase(getProductDetails.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message
            })

    }
})

export default productsClientSlice.reducer;