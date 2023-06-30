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
    async([idProduct,token]) => {
      try {
        console.log(idProduct, token, "AAAAAAAAAAA")
        const response= await axios.put("/admin/delete", {"id": idProduct} ,{
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


  export const putProduct = createAsyncThunk(
    'adminProducts/putProduct',
    async([token,selectedProductId, valueEdit]) => {
      try {
        console.log('REDUX idProuct', selectedProductId, 'values', valueEdit, 'token', token)
          response  = await axios.put(`admin/update/${selectedProductId}`,valueEdit ,{
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


        .addCase(banProduct.pending, (state, action) => {
          state.status = 'loading';
        })
        .addCase(banProduct.fulfilled, (state, action) => {
          state.status = 'succeeded';
          const sub = action.payload;  // acá tenemos el sub
          const prodcut = state.prodcut.find((prodcut)=> prodcut.id === id); //buscamos en el estado allUsers al usuario
          if(prodcut){                                              // que corresponde a nuestro sub y verificamos si tenemos el user.
              prodcut.is_available = !prodcut.is_available                      // acá cambiamos la propiedad de borrado, si era true ahora es false y viceversa
              if(prodcut.is_available){                                   //si la propiedad borrado es true 
                  state.bannedProcuts.push(prodcut);                   //agrega el usuario al array bannedUser
              }else{
                  state.bannedProcuts = state.bannedProcuts.filter((bannedProdcut)=> bannedProdcut.id !== id) // si borrado es false, filtra 
              }                                                                 // y devuelve los usuarios baneados diferentes a ese sub
          }                                                   
          state.error= null;
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