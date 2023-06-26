import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const rol = localStorage.getItem('rol');
const token = rol === 'client' && localStorage.getItem('token');

const initialState = {
    cart: [],
    allDepartments: [],
    allMunicipalities: [],
    paymentOrderResponse: {},
    paymentNotificationResponse: {},
    status: 'idle',
    error: null
};

export const getCartForAUser = createAsyncThunk(
    'payment/getCartForAUser',
    async () => {
        try {
            const response = await axios.get('/client/cartuser', {
                headers: {
                    Authorization: `Bearer ${ token }`
                }
            });
            return response.data;
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }
);

export const getAllDepartments = createAsyncThunk(
    'payment/getAllDepartments',
    async () => {
        try {
            const response = await axios.get('/client/alldepartments', {
                headers: {
                    Authorization: `Bearer ${ token }`
                }
            });
            return response.data;
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }
);

export const getAllMunicipalities = createAsyncThunk(
    'payment/getAllMunicipalities',
    async (departmentId) => {
        try {
            const response = await axios.get(`/client/munbydep?departmentId=${ departmentId }`, {
                headers: {
                    Authorization: `Bearer ${ token }`
                }
            });
            return response.data;
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }
);

export const createPaymentOrder = createAsyncThunk(
    'payment/createPaymentOrder',
    async (data) => {
        console.log('ESTO ENVIO AL BACK',data)
        try {
            const response = await axios.post('/client/createorder', data, {
                headers: {
                    Authorization: `Bearer ${ token }`
                }
            });
            return response.data;
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }
);

export const postPaymentNotification = createAsyncThunk(
    'payment/postPaymentNotification',
    async (queryParams) => {
        try {
            const response = await axios.post(`/client/postnotification?${ queryParams }`, {}, {
                headers: {
                    Authorization: `Bearer ${ token }`
                }
            });
            return response.data;
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }
);

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    extraReducers: (builder) => {
        builder

            .addCase(getCartForAUser.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getCartForAUser.fulfilled, (state, action) => {
                state.status = 'succeeded',
                state.cart = action.payload
            })
            .addCase(getCartForAUser.rejected, (state, action) => {
                state.status = 'rejected',
                state.error = action.error.message 
            })

            .addCase(getAllDepartments.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getAllDepartments.fulfilled, (state, action) => {
                state.status = 'succeeded',
                state.allDepartments = action.payload
            })
            .addCase(getAllDepartments.rejected, (state, action) => {
                state.status = 'rejected',
                state.error = action.error.message 
            })

            .addCase(getAllMunicipalities.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getAllMunicipalities.fulfilled, (state, action) => {
                state.status = 'succeeded',
                state.allMunicipalities = action.payload
            })
            .addCase(getAllMunicipalities.rejected, (state, action) => {
                state.status = 'rejected',
                state.error = action.error.message 
            })

            .addCase(createPaymentOrder.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(createPaymentOrder.fulfilled, (state, action) => {
                state.status = 'succeeded',
                state.paymentOrderResponse = action.payload
            })
            .addCase(createPaymentOrder.rejected, (state, action) => {
                state.status = 'rejected',
                state.error = action.error.message 
            })

            .addCase(postPaymentNotification.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(postPaymentNotification.fulfilled, (state, action) => {
                state.status = 'succeeded',
                state.paymentNotificationResponse = action.payload
            })
            .addCase(postPaymentNotification.rejected, (state, action) => {
                state.status = 'rejected',
                state.error = action.error.message 
            })
        }
});

export default paymentSlice.reducer;