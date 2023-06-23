import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    cartFill:[],

}


export const Fill = createAsyncThunk(
    'carts/Fill',
    async (token) => {
        try {
        const response= await axios.get("/client/cartuser/", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        console.log(response.data)
        if(response.data.message==="El carrito no tiene productos agregados"){
            return []
        }else{return response.data} 

        } catch (error) {
            console.log(error)
        }
    }
)

export const CreateCart = createAsyncThunk(
    'carts/CreateCart',
    async (token) => {
        try {
            const response= await axios.post("/client/createcart", {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }

            });
            if(response.data.message==="No se puede crear un nuevo carrito, el usuario ya tiene un carrito activo"){
                console.log("carrito ya creado")
            }else{
                console.log(response.data)
            }

        } catch (error) {
            console.log(error)
        }
    }
)

export const Delete = createAsyncThunk(
    'carts/Delete',
    async (data) => {
        try {

        } catch (error) {
            console.log(error)
        }
    }
)


export const cartSlice = createSlice({
    name:"cart" ,
    initialState,
        extraReducers: (builder)=>{
            builder
            .addCase(Fill.pending, (state) => {
                state.status = 'loading'
                
            })
            .addCase(Fill.fulfilled, (state, action) => {
                state.status = 'succeeded',
                state.cart = action.payload
            })
            .addCase(Fill.rejected, (state, action) => {
                state.status = 'rejected',
                state.error = action.error.message 
            })
            .addCase(Delete.pending, (state) => {
                state.status = 'loading'
                
            })
            .addCase(Delete.fulfilled, (state, action) => {
                state.status = 'succeeded',
                state.total=action.payload
                
            })
            .addCase(Delete.rejected, (state, action) => {
                state.status = 'rejected',
                state.error = action.error.message 
            })
        
    }
});


export default cartSlice.reducer;