import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    cartFill:[],
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

        console.log('Respuesta de fill', response.data)
        if(response.data.message){
            
            return ([])
        }else{return response.data} 

        } catch (error) {
            console.log(error)
        }
    }
)
export const FillNOT = createAsyncThunk(
    'cart/FillNOT',
    async () => {
        try {
            return([])
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
            if(dataset.data.message==="El usuario no tiene productos agregados en el carrito"){
                return ([])
            }else{return dataset.data} 

        } catch (error) {
            console.log(error)
        }
    }
)

export const AddtoCart = createAsyncThunk(
    'cart/AddtoCart',
    async (data) => {
        try {
            const response= await axios.post("/client/addproductcart", {productId:data[0], inventoryId:data[1], quantity:data[2]}, {
                headers: {
                    Authorization: `Bearer ${data[3]}`
                }
            });
            console.log(response.data)
            const response2= await axios.get("/client/cartuser/", {
                headers: {
                    Authorization: `Bearer ${data[3]}`
                }
            })
    
            console.log('Respuesta de fill Add to cart', response2.data)
            if(response2.data.message){
                return ([])
            }else{return response2.data} 
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
            .addCase(AddtoCart.pending, (state) => {
                state.status = 'loading'
                
            })
            .addCase(AddtoCart.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.cartFill = action.payload
                
            })
            .addCase(AddtoCart.rejected, (state, action) => {
                state.status = 'rejected',
                state.error = action.error.message 
            })
            .addCase(FillNOT.pending, (state) => {
                state.status = 'loading'
                
            })
            .addCase(FillNOT.fulfilled, (state, action) => {
                state.status = 'succeeded',
                state.cartFill = []
            })
            .addCase(FillNOT.rejected, (state, action) => {
                state.status = 'rejected',
                state.error = action.error.message 
            })
        
    }
});


export default cartSlice.reducer;