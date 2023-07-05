import { createAsyncThunk, createAction, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    allClients: [],
    bannedClients: [],
    status: 'idle',
    error: null,
  };
  
  export const banUser = createAsyncThunk(
    'clients/banUser',
    async([sub,token]) => {
      try {
        console.log(sub, token, "AAAAAAAAAAA")
        const response= await axios.put("/admin/client/delete", {"sub": sub} ,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        
        console.log('banUser ok', response.data)
        return sub
      } catch (error) {
        console.log('error banUser', error.response.data)
        throw error.response.data
      }
    }
  )

  export const getAllClients = createAsyncThunk(
    'clients/getAllClients',
    async({token})=>{
        try {
            const response = await axios.get("/admin/allclients", {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })

            console.log('Traigo los Clientes', response.data)
            return response.data;
        } catch (error) {
            console.log('Error del geAllClients', error.response.data)
            throw error.response.data
        }
    }
  )


const clientsSlice = createSlice({
    name: 'clients',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase( getAllClients.pending, (state) => {
            state.status = "loading";
          })
          .addCase( getAllClients.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.allClients = action.payload;
            state.error = null;
          })
          .addCase( getAllClients.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error.message;
          })

          
          .addCase(banUser.pending, (state, action) => {
            state.status = 'loading';
          })
          .addCase(banUser.fulfilled, (state, action) => {
            state.status = 'succeeded';
            const sub = action.payload;  // acá tenemos el sub
            const user = state.allClients.find((user)=> user.sub === sub); //buscamos en el estado allUsers al usuario
            if(user){                                              // que corresponde a nuestro sub y verificamos si tenemos el user.
                user.erased = !user.erased                       // acá cambiamos la propiedad de borrado, si era true ahora es false y viceversa
                if(user.erased){                                   //si la propiedad borrado es true 
                    state.bannedClients.push(user);                   //agrega el usuario al array bannedUser
                }else{
                    state.bannedClients = state.bannedClients.filter((bannedUser)=> bannedUser.sub !== sub) // si borrado es false, filtra 
                }                                                                 // y devuelve los usuarios baneados diferentes a ese sub
            }                                                   
            state.error= null;
          })
          .addCase(banUser.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.error.message;
          })


          
    }
})

export default clientsSlice.reducer;