import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    profileData:{},
    error:""
}


export const ViewProfile = createAsyncThunk(
    'profileSuperAdmin/ViewProfile',
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
    'profileSuperAdmin/SaveProfile',
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


export const profileSuperAdminSlice = createSlice({
    name:"profileSuperAdmin" ,
    initialState: {
        profileData: {}, // Estado para almacenar los datos actualizados del perfil
      },
      reducers: {
        updateProfileData(state, action) {
          state.profileData = action.payload;
        },
    },
        extraReducers: (builder)=>{
            builder
            .addCase(ViewProfile.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(ViewProfile.fulfilled, (state, action) => {
                state.status = 'succeeded',
                state.profileData = action.payload
            })
            .addCase(ViewProfile.rejected, (state, action) => {
                state.status = 'rejected',
                state.error = action.error.message 
            })
    }
});

export const { updateProfileData } = profileSuperAdminSlice.actions;

export default profileSuperAdminSlice.reducer;