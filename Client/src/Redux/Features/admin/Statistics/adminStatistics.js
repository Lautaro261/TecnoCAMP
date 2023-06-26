import { createAsyncThunk, createAction, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

// const rol = localStorage.getItem('rol');
// const token = localStorage.getItem('token');

const initialState = {
    inventoriesStatistic:{},
    clientsStatistic:{},
    status: 'idle',
    error: null,
  };


  export const getInventories = createAsyncThunk(
    'adminStatistics/getInventories',
    async(token) => {
      console.log('token', token)
      try {
         const response  = await axios.get(`/admin/inventories/number`,{
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


  export const getClientsNumber = createAsyncThunk(
    "adminStatistics/getClientsNumber",
    async (token) => {
      try {
        const response = await axios.get("/admin/clients/number", {
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

  
const adminStatisticsSlice = createSlice({
    name: 'adminStatistics',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(getInventories.pending, (state) => {
            state.status = "loading";
          })
          .addCase(getInventories.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.inventoriesStatistic = action.payload;
            state.error = null;
          })
          .addCase(getInventories.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
          })
          .addCase(getClientsNumber.pending, (state) => {
            state.status = "loading";
          })
          .addCase(getClientsNumber.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.clientsStatistic = action.payload;
            state.errorSearch = null;
          })
          .addCase(getClientsNumber.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error;
          })

    }
})

export default adminStatisticsSlice.reducer;