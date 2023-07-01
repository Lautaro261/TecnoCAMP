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
            console.log('error en loginUser', error.response.data.message)
            throw error.response.data.message
        }
    }
)

export const signUpUser = createAsyncThunk(
    'logInAndSignUp/signUpUser',
    async (userData) => {
        try {

            const response = await axios.post('/signup', userData)

            console.log('soy response en createUser', response.data)

            // if(response.data.message.includes('ya existe')){
            //     console.log('SI EXISTE ENTRE!')
            //     const response2 = await axios.post('/login', userData)
            //     console.log('SEGUNDA PETICION', response2.data)
            //     return response2.data  
            // }

            return response.data;

        } catch (error) {
            console.log('error en createUser', error.response.data.message)
            throw error.response.data.message
        }
        /* console.log('error en createUser', error.response.data.message)
        throw error.response.data.message */
    }

)
export const logoutOwn = createAction('logInAndSignUp/logoutOwn')

const logInAndSignUpSlice = createSlice({
    name: 'logInAndSignUp',
    initialState,
    reducers: {
        logoutOwn: (state) => {
            state.userCreated = {},
                state.userSession = {}
        }
    },

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


            .addCase(signUpUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(signUpUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // state.userSession = action.payload;
                state.userCreated = action.payload;
                state.errorCreate = null;
            })
            .addCase(signUpUser.rejected, (state, action) => {
                state.status = 'rejected';
                state.errorCreate = action.error.message;
            })
    }
})

export default logInAndSignUpSlice.reducer