import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    allBrands: [],
    brandId:{},
    deleteResponse:{},
    updateResponse:{},
    createResponse:{},
    status: 'idle',
    error: null
};

//http://localhost:3001/admin/createbrand crear
//http://localhost:3001/admin/brand/${idBrand} traer por id 
//http://localhost:3001/admin/updatebrand modificar
//http://localhost:3001/admin/deletebrand delete 


export const brandById = createAsyncThunk(
    'adminBrands/brandById',
    async ({ token, idBrand }) => {
      try {
        const response = await axios.get(`http://localhost:3001/admin/brand/${idBrand}`, {
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
  

  export const updateBrand = createAsyncThunk(
    'adminBrands/updateBrand',
    async ({ token, values}) => {
        console.log('values', values)
      try {
        response = await axios.put('http://localhost:3001/admin/updatebrand', values, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        console.log('updateBrand', response.data)
        return response.data
      } catch (error) {
        console.log('error updateBrand', error.response.data)
        throw error.response.data
      }
    }
  )
  
  
  
  export const deleteBrand = createAsyncThunk(
    'adminBrands/deleteBrand',
    async ({ token, id }) => {
      try {
        const response = await axios.put('http://localhost:3001/admin/deletebrand', {id: id}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        console.log('deleteBrand', response.data)
        return response.data
      } catch (error) {
        console.log('no se pudo eliminar', error.response.data)
        throw error.response.data
      }
    }
  )


  
  export const createBrand = createAsyncThunk(
    'adminBrands/createBrand',
    async ({ token, values }) => {
      try {
        const response = await axios.post('/admin/createbrand', values, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
  
        console.log('createBrand OKKK', response.data)
  
        return response.data
      } catch (error) {
        console.log('ERRORRR createBrand', error.response.data)
        throw error.response.data
      }
    }
  )



export const getAllBrands = createAsyncThunk(
    'adminBrands/getAllBrands',
    async (adminToken) => {
        try {
            const response = await axios.get('/admin/allbrands', {
                headers: {
                    Authorization: `Bearer ${ adminToken }`
                }
            });
            return response.data;
        } catch(error) {
            console.error(error.message);
            throw error;
        }
    }
);

const adminBrandsSlice = createSlice({
    name: 'adminBrands',
    initialState,
    extraReducers: (builder) => {
        builder


            .addCase(getAllBrands.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getAllBrands.fulfilled, (state, action) => {
                state.status = 'succeeded',
                state.allBrands = action.payload
                state.error = null
            })
            .addCase(getAllBrands.rejected, (state, action) => {
                state.status = 'rejected',
                state.error = action.error.message
            })


            .addCase(createBrand.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(createBrand.fulfilled, (state, action) => {
                state.status = 'succeeded',
                state.createResponse = action.payload
                state.error = null
            })
            .addCase(createBrand.rejected, (state, action) => {
                state.status = 'rejected',
                state.error = action.error.message
            })



            .addCase(deleteBrand.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(deleteBrand.fulfilled, (state, action) => {
                state.status = 'succeeded',
                state.deleteResponse = action.payload
                state.error = null
            })
            .addCase(deleteBrand.rejected, (state, action) => {
                state.status = 'rejected',
                state.error = action.error.message
            })



            .addCase(updateBrand.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateBrand.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.updateBrand = action.payload;
                state.error = null;
            })
            .addCase(updateBrand.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message;
            })



            .addCase(brandById.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(brandById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.brandId= action.payload;
                state.error = null;
            })
            .addCase(brandById.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message;
            })

    }
});


export default adminBrandsSlice.reducer;