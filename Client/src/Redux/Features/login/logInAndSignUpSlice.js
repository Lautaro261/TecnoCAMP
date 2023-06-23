import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    status: 'idle',
    userSession: {},
    userCreated: {},
    errorCreate: null,
    error: null,
}



export const loginUser = createAsyncThunk(
    'logInAndSignUp/loginUser',
    async (userData) => {
        try {

            const response = await axios.post('/login', userData)

            console.log('soy response en loginUser', response.data)

            return response.data;

        } catch (error) {
            console.log('error en loginUser',  error.response.data.message)
            throw  error.response.data.message
        }
    }
)

export const createUser = createAsyncThunk(
    'logInAndSignUp/createUser',
    async (userData) => {
        try {

            const response = await axios.post('/signup', userData)

            console.log('soy response en createUser', response.data)

            return response.data;

        } catch (error) {
            console.log('error en createUser', error.response.data.message)
            throw error.response.data.message
        }
    }
)

const logInAndSignUpSlice = createSlice({
    name: 'logInAndSignUp',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userSession = action.payload;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message;
            })


            .addCase(createUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userCreated = action.payload;
                state.errorCreate = null;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.status = 'rejected';
                state.errorCreate = action.error.message;
            })
    }
})

export default logInAndSignUpSlice.reducer