import { createAsyncThunk, createAction, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

// const rol = localStorage.getItem('rol');
// const token = localStorage.getItem('token');

const initialState = {
    postProduct:{},
    productPut: [],
    allProducts: [],
    bannedProcuts: [],
    searchedResult: [],
    photos: [],
    status: 'idle',
    error: null,
  };


  export const banProduct = createAsyncThunk(
    'adminProducts/banProduct',
    async([token, selectedProductId]) => {
      try {
        console.log("id", selectedProductId, "token", token)
        const response= await axios.put("/admin/delete", {"productId": selectedProductId} ,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        console.log('banUser ok', response.data)
        return sub
      } catch (error) {
        console.log('error banUser', error.response.data)
        throw error.response.data
      }
    }
  )

  export const EditProduct= createAsyncThunk(
    'adminProducts/EditProduct',
    async([token,selectedProductId, valueEdit]) => {
      try {
        console.log("soy el editar producto")
        const response= await axios.put(`admin/update/${selectedProductId}`,valueEdit ,{
          headers: {
              Authorization: `Bearer ${token}`
          }
      })
        console.log('editado correctamente', response.data)
        console.log(valueEdit)

        return response.data
      } catch (error) {
        console.log('error al editar', error.response.data)
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


        .addCase(banProduct.pending, (state, action) => {
          state.status = 'loading';
        })
        .addCase(banProduct.fulfilled, (state, action) => {
          state.status = "succeeded";
       
          state.bannedProcuts = action.payload;
          state.error = null;
        })
        .addCase(banProduct.rejected, (state, action) => {
          state.status = 'rejected';
          state.error = action.error.message;
        })


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

    }
})

export default adminProductsSlice.reducer;