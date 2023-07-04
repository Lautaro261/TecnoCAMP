import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
  allCategories: [],
  categoryResponse: {},
  deleteResponse: {},
  updateResponseCat: {},
  categoryId: {},
  status: 'idle',
  error: null,
};





export const categoryBiId = createAsyncThunk(
  'adminCategories/categoryBiId',
  async ({ token, idCategory }) => {
    try {
      const response = await axios.get(`http://localhost:3001/admin/category/${idCategory}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      console.log('cateegory por id ', response.data)
      return response.data

    } catch (error) {
      console.log('error category por id', error)
      return error.response.data
    }
  }
)

export const updateCategory = createAsyncThunk(
  'adminCategories/updateCategory',
  async ({ token, values }) => {
    console.log('values updateCategory', values)
    try {
      response = await axios.put('http://localhost:3001/admin/updatecategory', values, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log('updateCategory', response.data)
      return response.data
    } catch (error) {
      console.log('error updateCategory', error.response.data)
      throw error.response.data
    }
  }
)


export const deleteCategory = createAsyncThunk(
  'adminCategories/deleteCategory',
  async ({ token, id }) => {
    try {
      const response = await axios.put('http://localhost:3001/admin/deletecategory', id, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log('deleteCategory', response.data)
      return response.data
    } catch (error) {
      console.log('no se pudo eliminar', error.response.data)
      throw error.response.data
    }
  }
)

export const createCategory = createAsyncThunk(
  'adminCategories/createCategory',
  async ({ token, values }) => {
    try {
      const response = await axios.post('/admin/createcategory', values, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      console.log('createCategory OKKK', response.data)

      return response.data
    } catch (error) {
      console.log('ERRORRR adminCategory', error.response.data)
      throw error.response.data
    }
  }
)

export const getAllCategories = createAsyncThunk(
  'adminCategories/getAllCategories',
  async (adminToken) => {
    try {
      const response = await axios.get('/admin/allcategories', {
        headers: {
          Authorization: `Bearer ${adminToken}`
        }
      });
      return response.data;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }
);

const adminCategoriesSlice = createSlice({
  name: 'adminCategories',
  initialState,
  reducers: {},
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



      .addCase(getAllCategories.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.status = 'succeeded',
          state.allCategories = action.payload,
          state.error = null
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.status = 'rejected',
          state.error = action.error.message
      })


      .addCase(deleteCategory.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.status = 'succeeded',
          state.deleteResponse = action.payload,
          state.error = null
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = 'rejected',
          state.error = action.error.message
      })


      .addCase(updateCategory.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.status = 'succeeded',
          state.updateResponseCat = action.payload,
          state.error = null
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.status = 'rejected',
          state.error = action.error.message
      })


      .addCase(categoryBiId.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(categoryBiId.fulfilled, (state, action) => {
        state.status = 'succeeded',
          state.categoryId = action.payload,
          state.error = null
      })
      .addCase(categoryBiId.rejected, (state, action) => {
        state.status = 'rejected',
          state.error = action.error.message
      })

  }
})


export default adminCategoriesSlice.reducer;

