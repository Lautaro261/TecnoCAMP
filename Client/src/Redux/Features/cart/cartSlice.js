import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    cartFill:[],
    lastProduct:{}
}


export const Fill = createAsyncThunk(
    'cart/Fill',
    async (token) => {
        try {
        const response= await axios.get("/client/cartuser/", {
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

export const CreateCart = createAsyncThunk(
    'cart/CreateCart',
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

export const AddCart = createAsyncThunk(
    'cart/AddCart',
    async ({order, token}) => {
        try {
            console.log('LLEGUE', order)
            const response= await axios.post("/client/addproductcart", order , {
                headers: {
                    Authorization: `Bearer ${token}`
                }

            });
            console.log(response.data)
            return response.data

        } catch (error) {
            console.log(error)
        }
    }
)

export const Delete = createAsyncThunk(
    'cart/Delete',
    async (data) => {
        try {
            const response= await axios.put("/client/deleteproductcart", {
                "productId":data[1], "inventoryId":data[2],
            }, {
                headers: {
                    Authorization: `Bearer ${data[0]}`
                }

            });

            console.log(response.data, "Delete desde el Slice")

            const Crear= await axios.post("/client/createcart", {}, {
                headers: {
                    Authorization: `Bearer ${data[0]}`
                }

            });
            if(Crear.data.message==="No se puede crear un nuevo carrito, el usuario ya tiene un carrito activo"){
                console.log("carrito ya creado")
            }else{
                console.log(Crear.data)
            }

            const dataset= await axios.get("/client/cartuser/", {
                headers: {
                    Authorization: `Bearer ${data[0]}`
                }
            })
    
            console.log(dataset.data, "refill")
            if(dataset.data.message==="El carrito no tiene productos agregados"){
                return ([])
            }else{return dataset.data} 

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
                state.cartFill = action.payload
            })
            .addCase(Fill.rejected, (state, action) => {
                state.status = 'rejected',
                state.error = action.error.message 
            })
            .addCase(AddCart.pending, (state) => {
                state.status = 'loading'
                
            })
            .addCase(AddCart.fulfilled, (state, action) => {
                state.status = 'succeeded',
                state.lastProduct = action.payload
            })
            .addCase(AddCart.rejected, (state, action) => {
                state.status = 'rejected',
                state.error = action.error.message 
            })
            .addCase(Delete.pending, (state) => {
                state.status = 'loading'
                
            })
            .addCase(Delete.fulfilled, (state, action) => {
                state.status = 'succeeded',
                state.cartFill=action.payload
                
            })
            .addCase(Delete.rejected, (state, action) => {
                state.status = 'rejected',
                state.error = action.error.message 
            })
        
    }
});


export default cartSlice.reducer;