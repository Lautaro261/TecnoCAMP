import { createAsyncThunk, createAction, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const rol = localStorage.getItem('rol');
const token = rol === 'admin' && localStorage.getItem('token');

const initialState = {
    allCategories: [],
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

export const getAllCategories = createAsyncThunk(
    'clientCategories/getAllCategories',
    async () => {
        try {
            const response = await axios.get('/admin/allcategories', {
              headers: {
                Authorization: `Bearer ${ token }`
              }
            });
            return response.data;
        } catch(error) {
            console.error(error.message);
            throw error;
        }
    }
);

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
  }
})


export default adminCategoriesSlice.reducer;

