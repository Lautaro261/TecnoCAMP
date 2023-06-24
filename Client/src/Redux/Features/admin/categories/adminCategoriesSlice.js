import { createAsyncThunk, createAction, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    categoryResponse: {},
    status: 'idle',
    error: null,
  };

  export const createCategory = createAsyncThunk(
    'adminCategories/createCategory',
    async (name) => {
        try {
            const response = await axios.post('/admin/createcategory',{name})

            console.log('createCategory OKKK', response.data)

            return response.data 
        } catch (error) {
            console.log('ERRORRR adminCategory', error.response.data)
            throw error.response.data
        }
    }
  )

  const adminCategoriesSlice = createSlice({
    name:'adminCategories',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
    builder
    .addCase(createCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categoryResponse = action.payload;
        state.error = null;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })
    }
  })


  export default adminCategoriesSlice.reducer;

