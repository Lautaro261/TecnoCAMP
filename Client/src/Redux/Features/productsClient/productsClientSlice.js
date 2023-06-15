import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    status: 'idle',
    allProducts: [],
    allCategories:[],
    error: null,
}


export const getAllProducts = createAsyncThunk(
    'productsClient/getAllProducts',
    async ({ token }) => {

        try {
            const response = await axios.get('/client/allproducts', /* {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            } */);
            console.log('getAllProducts OK', response.data)

            return response.data;

        } catch (error) {
            console.log('ERRORR GETALLPRODUCTS REDUX', error)
            throw error;
        }
    }
)


export const getAllCategories = createAsyncThunk(
    'productsClient/getAllCategories',
    async () => {

        try {
            const response = await axios.get('/client/allcategories', /* {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            } */);
           // console.log('getAllCategories OK', response.data)

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
            .addCase(getAllCategories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllCategories.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.allCategories = action.payload;
                state.error = null;
            })
            .addCase(getAllCategories.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message
            })

    }
})

export default productsClientSlice.reducer;