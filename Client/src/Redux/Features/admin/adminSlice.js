import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
  status: 'idle',
  clients: [],
  error: null,
};

export const getClientsback = createAsyncThunk(
  'admin/getClientsback',
  async ({ token }) => {
    try {        
      const response = await axios.get('http://localhost:3001/admin/allclients', {
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
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      });
  }
});

export default adminSlice.reducer;