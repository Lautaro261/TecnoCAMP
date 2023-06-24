import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
  allProducts: [],
  currentAllProducts: [],
  searchedResult: [],
  filteredProducts: [],
  currentFilteredProducts: [],
  status: 'idle',
  clients: [],
  bannedClients: [],
  error: null,
};

export const getAllProducts = createAsyncThunk(
  "admin/getAllProducts",
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
      console.error('ERRORRRRRRRRRRRRRRRRRRRRRR en getAllProduct', error);
      throw error;
    }
  }
);

export const getProductsSearched = createAsyncThunk(
  "admin/getProductsSearched",
  async (name) => {
    try {
      const response = await axios.get(`/client/allproducts?name=${name}`);
      //console.log("RESPUESTA DEL SEARCH", response.data);

      return response.data;
    } catch (error) {
      console.log("ERRORR GETALLPRODUCTS REDUX", error);
      throw error;
    }
  }
);

export const banUser = createAsyncThunk(
  'admin/banUser',
  async([sub,token]) => {
    try {
      console.log(sub, token, "AAAAAAAAAAA")
      const response= await axios.put("/admin/client/delete", {"sub": sub} ,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      
      console.log('banUser ok', response.data)
      return sub
    } catch (error) {
      console.log('error banUser', error)
      throw error
    }
  }
)

export const getClientsback = createAsyncThunk(
  'admin/getClientsback',
  async ({ token }) => {
    try {        
      const response = await axios.get('/admin/allclients', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("OOOOOOOOOKKK", response.data);
      return response.data;
    } catch (error) {
      console.log('ERROR!!!!!', error);
      throw error;
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setCurrentAllProducts: (state, action) => {
      state.currentAllProducts = action.payload;
    },
  },


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


      .addCase(getClientsback.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getClientsback.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.clients = action.payload;
        state.error = null;
      })
      .addCase(getClientsback.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      })
      .addCase(banUser.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(banUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const sub = action.payload;  // acá tenemos el sub
        const user = state.clients.find((user)=> user.sub === sub); //buscamos en el estado allUsers al usuario
        if(user){                                              // que corresponde a nuestro sub y verificamos si tenemos el user.
            user.erased = !user.erased                       // acá cambiamos la propiedad de borrado, si era true ahora es false y viceversa
            if(user.erased){                                   //si la propiedad borrado es true 
                state.bannedClients.push(user);                   //agrega el usuario al array bannedUser
            }else{
                state.bannedClients = state.bannedClients.filter((bannedUser)=> bannedUser.sub !== sub) // si borrado es false, filtra 
            }                                                                 // y devuelve los usuarios baneados diferentes a ese sub
        }                                                   
        state.error= null;
      })
      .addCase(banUser.rejected, (state, action) => {
        state.status = 'rejected';
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
});

export default adminSlice.reducer;