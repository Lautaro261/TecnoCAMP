import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    historyFill:[],
    error:""
}


export const Fill = createAsyncThunk(
    'history/Fill',
    async (token) => {
        try {
        const response= await axios.get("/client/historyorders", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(response.data)
        if(response.data.message){
            return ([])
        }else{return response.data} 
        } catch (error) {
            console.log(error)
        }
    }
)


export const historySlice = createSlice({
    name:"history" ,
    initialState,
        extraReducers: (builder)=>{
            builder
            .addCase(Fill.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(Fill.fulfilled, (state, action) => {
                state.status = 'succeeded',
                state.historyFill = action.payload
            })
            .addCase(Fill.rejected, (state, action) => {
                state.status = 'rejected',
                state.error = action.error.message 
            })
    }
});

export default historySlice.reducer;