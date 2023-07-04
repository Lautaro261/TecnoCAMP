import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    profiledat:{},
    error:""
}


export const Fill = createAsyncThunk(
    'profile/Fill',
    async (token) => {
        try {
        const response= await axios.get("/profile", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(response.data)
        if(response.data.message){
            return ({})
        }else{return response.data} 
        } catch (error) {
            console.log(error)
        }
    }
)

export const SaveProfile = createAsyncThunk(
    'profile/SaveProfile',
    async (data) => {
        try {
        console.log("llega a redux",data)
        const response= await axios.put("/profile/edit",data[1], {
            headers: {
                Authorization: `Bearer ${data[0]}`
            }
        })
        console.log(response.data)
        return response.data
        } catch (error) {
            console.log(error)
        }
    }
)


export const profileSlice = createSlice({
    name:"profile" ,
    initialState,
        extraReducers: (builder)=>{
            builder
            .addCase(Fill.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(Fill.fulfilled, (state, action) => {
                state.status = 'succeeded',
                state.profiledat = action.payload
            })
            .addCase(Fill.rejected, (state, action) => {
                state.status = 'rejected',
                state.error = action.error.message 
            })
    }
});

export default profileSlice.reducer;