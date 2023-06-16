import { createAsyncThunk, createAction, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    allProducts: [],
    filteredProducts: [],
    idCategory: '',
    idBrand: '',
    minPrice: '',
    maxPrice: '',
    status: 'idle',
    error: null
};

export const getAllProducts = createAsyncThunk(
    'clientProductsSlice/getAllProducts',
    async () => {
        try {
            const response = await axios.get('/client/allproducts');
            return response.data;
        } catch(error) {
            console.error(error.message);
            throw error;
        }
    }
);

export const getFilteredProducts = createAsyncThunk(
    'clientProductsSlice/getFilteredProducts',
    async (dataBody) => {
        try {
            const response = await axios.post('/client/filtersComb', dataBody);
            return response.data;
        } catch(error) {
            console.error(error.message);
            throw error;
        }
    }
);

export const setFilteredProductsToEmpty = createAction('clientProducts/setFilteredProductsToEmpty');
export const setIdCategory = createAction('clientProducts/setIdCategory');
export const setIdBrand = createAction('clientProducts/setIdBrand');
export const setMinPrice = createAction('clientProducts/setMinPrice');
export const setMaxPrice = createAction('clientProducts/setMaxPrice');

const clientProductsSlice = createSlice({
    name: 'clientProducts',
    initialState,
    reducers: {
        setFilteredProductsToEmpty: (state, action) => {
            state.filteredProducts = action.payload
        },
        setIdCategory: (state, action) => {
            state.idCategory = action.payload
        },
        setIdBrand: (state, action) => {
            state.idBrand = action.payload
        },
        setMinPrice: (state, action) => {
            state.minPrice = action.payload
        },
        setMaxPrice: (state, action) => {
            state.maxPrice = action.payload
        }
    },
    extraReducers: (builder) => {
        builder

            .addCase(getAllProducts.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.status = 'succeeded',
                state.allProducts = action.payload
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.status = 'rejected',
                state.error = action.error.message
            })

            .addCase(getFilteredProducts.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getFilteredProducts.fulfilled, (state, action) => {
                state.status = 'succeeded',
                state.filteredProducts = action.payload
            })
            .addCase(getFilteredProducts.rejected, (state, action) => {
                state.status = 'rejected',
                state.error = action.error.message
            })
    }
});

export default clientProductsSlice.reducer;
