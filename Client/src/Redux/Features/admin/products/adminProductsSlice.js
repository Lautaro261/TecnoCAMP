import { createAsyncThunk, createAction, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

// const rol = localStorage.getItem('rol');
// const token = localStorage.getItem('token');

const initialState = {
    productPut: [],
    allProducts: [],
    searchedResult: [],
    photos: [],
    status: 'idle',
    error: null,
  };


  export const putProduct = createAsyncThunk(
    'adminProducts/putProduct',
    async([token,idProduct, values]) => {
      console.log('idProuct', idProduct, 'values', values, 'token', token)
      try {
          response  = await axios.put(`admin/update/${idProduct}`,{values},{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        console.log('okokok put product', response.data)
        return  response.data;
      } catch (error) {
        console.log('putttproduct,errorr', error.response.data)
        throw error.response.data
      }
    }
  )


  export const getAllProducts = createAsyncThunk(
    "adminProducts/getAllProducts",
    async (token) => {
      try {
        const response = await axios.get("/admin/allproducts", {
          headers: {
              Authorization: `Bearer ${token}`
          }
      });
        //console.log('TODO OK EN GETALLPRODUCTS', response.data)
        return response.data;
      } catch (error) {
        console.error('ERRORRRR en getAllProduct', error);
        throw error;
      }
    }
  );

  export const getProductsSearched = createAsyncThunk(
    "adminProducts/getProductsSearched",
    async ({value, token}) => {
      try {
        console.log('REDUX',value);
        //console.log('REDUX',token);
        const response = await axios.get(`/admin/allproducts?name=${value}`,{
          headers: {
            Authorization: `Bearer ${token}`
        }
        });
        console.log("RESPUESTA DEL SEARCH", response.data);
  
        return response.data;
      } catch (error) {
        console.log("ERRORR GETALLPRODUCTS REDUX", error);
        throw error;
      }
    }
  );

const adminProductsSlice = createSlice({
    name: 'adminProducts',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(getAllProducts.pending, (state) => {
            state.status = "loading";
          })
          .addCase(getAllProducts.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.allProducts = action.payload;
            state.error = null;
          })
          .addCase(getAllProducts.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
          })
          .addCase(getProductsSearched.pending, (state) => {
            state.status = "loading";
          })
          .addCase(getProductsSearched.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.searchedResult = action.payload;
            state.errorSearch = null;
          })
          .addCase(getProductsSearched.rejected, (state, action) => {
            state.status = "rejected";
            state.errorSearch = action.error;
          })


          .addCase(putProduct.pending, (state) => {
            state.status = "loading";
          })
          .addCase(putProduct.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.productPut = action.payload;
            state.error = null;
          })
          .addCase(putProduct.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
          })
    }
})

export default adminProductsSlice.reducer;