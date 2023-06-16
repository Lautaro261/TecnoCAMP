import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    status: 'idle',
    allProducts: [],
    allCategories:[],
    productsByCategory: [],
    productDetails: {},
    category:"hola",
    error: null,
}


export const getProductsByCategory = createAsyncThunk(
    'productsClient/getProductsByCategory',
    async (idProduct) => {
        console.log('id filtro por categoria', idProduct )
        try {
            const response = await axios.get(`/client/filterCategory/${idProduct}`)
            console.log('getproductByCategory OKKKK', response.data)

            return response.data;

        } catch (error) {
            console.log('ERRORRRRRR en getProductsByCategory', error)
            throw error;
        }
    }
)

export const getAllProducts = createAsyncThunk(
    'productsClient/getAllProducts',
    async () => {

        try {
            const response = await axios('/client/allproducts');
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
    async (id) => {

        try {
            const response1 = await axios.get(`/client/product/${id}`);
            const catid= response1.data.categoryId
            const response2 = await axios.get(`/client/category/${catid}`);

            console.log(id)
            console.log('getProductDetails OK', response1.data)
            console.log("categoriaaaa", response2.data)
            return [response1.data, response2.data.name];

        } catch (error) {
            console.log('ERRORR GETPRODUCTDETAILS REDUX', error)
            throw error;
        }
    }
)



export const clearDetails = createAction('productsClient/clearDetails')
export const clearProductsByCategory = createAction('productsClient/clearProductsByCategory')


export const getItems = createAsyncThunk(
    'productsClient/getItems',
    async () => {

        try {
            const response = await axios.get('/client/allcategories');
            console.log('RESPUESTA BACK', response.data);

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
    reducers: {
        clearProductsByCategory: (state) => {
            state.productsByCategory={};
            state.category=""
        },
        clearDetails: (state) => {
            state.productDetails = {};
            state.category=""

        }
    },
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
            .addCase(getItems.pending, (state) => {
                state.status = 'loading';
              })
            .addCase(getItems.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.allCategories = action.payload;
                state.error = null;
              })
            .addCase(getItems.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message;
              })
//

            .addCase(getProductDetails.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getProductDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.productDetails = action.payload[0];
                state.category=action.payload[1]
                state.error = null;
            })
            .addCase(getProductDetails.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message
            })
//

            .addCase(getProductsByCategory.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getProductsByCategory.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.productsByCategory = action.payload;
                state.error = null;
            })
            .addCase(getProductsByCategory.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message
            })
//
            

    }
})

export default productsClientSlice.reducer;