import { createAsyncThunk, createAction, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    allOngoingOrders: [], 
    shippingStatusResponse: {}, 
    status: 'idle',
    error: null
};

export const getAllOngoingOrders = createAsyncThunk(
    'ongoingOrders/getAllOngoingOrders',
    async (token) => {
        try {
            const response = await axios.get('/admin/ordersandproducts', {
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

export const changeOrderShippingStatus = createAsyncThunk(
    'ongoingOrders/changeOrderShippingStatus',
    async ({ values, orderId, token }) => {
        try {
            const response = await axios.put(`/admin/orderput/${ orderId }`, values, {
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

export const setShippingStatusResponse = createAction('ongoingOrders/setShippingStatusResponse');

const ongoingOrdersSlice = createSlice({
    name: 'ongoingOrders',
    initialState, 
    reducers: {
        setShippingStatusResponse: (state, action) => {
            state.shippingStatusResponse = action.payload;
        }
    }, 
    extraReducers: (builder) => {
        builder

            .addCase(getAllOngoingOrders.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getAllOngoingOrders.fulfilled, (state, action) => {
                state.status = 'succeeded',
                state.allOngoingOrders = action.payload
            })
            .addCase(getAllOngoingOrders.rejected, (state, action) => {
                state.status = 'rejected',
                state.error = action.error.message 
            })

            .addCase(changeOrderShippingStatus.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(changeOrderShippingStatus.fulfilled, (state, action) => {
                state.status = 'succeeded',
                state.shippingStatusResponse = action.payload
            })
            .addCase(changeOrderShippingStatus.rejected, (state, action) => {
                state.status = 'rejected',
                state.error = action.error.message
            })
    }
});

export default ongoingOrdersSlice.reducer;