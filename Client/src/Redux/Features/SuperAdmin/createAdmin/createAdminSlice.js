import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
const token = localStorage.getItem("token"); // OBTENER TOKEN

const initialState = {
  status: "idle",
  //   userSession: {},
  allAdmins: [],
  userCreated: {},
  bannedAdmins: [],
  errorCreate: null,
  error: null,
};

export const createNewAdmin = createAsyncThunk(
  "createAdmin/createNewAdmin",
  async ({ sub, email, password }) => {
    try {
      const adminData = { sub, email, password }; // Crear objeto con los datos necesarios
      const response = await axios.post("/superadmin/createadmin", adminData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Todo correcto en createAdmin", response.data);
      return response.data;
    } catch (error) {
      console.log("Hubo un error en createAdmin", error.response.data.message);
      throw error.response.data.message;
    }
  }
);

export const getAllAdmins = createAsyncThunk(
  "createAdmin/getAllAdmins",
  async (tokena) => {
    try {
      const response = await axios.get("/superadmin/allAdmins", {
        headers: {
          Authorization: `Bearer ${tokena}`,
        },
      });
      console.log("Aqui estan todos los admins", response.data);
      return response.data;
    } catch (error) {
      console.log("Hubo un error en getAllAdmins", error.response.data.message);
      throw error.response.data.message;
    }
  }
);

export const banUser = createAsyncThunk(
  "createAdmin/banUser",
  async ([sub, token]) => {
    try {
      console.log(sub, token, "777");
      const response = await axios.put(
        "/superadmin/admin/delete",
        { sub: sub },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("banUser ok", response.data);
      return sub;
    } catch (error) {
      console.log("error banUser", error.response.data);
      throw error.response.data;
    }
  }
);

export const setUserCreated = createAction("createAdmin/setUserCreated");
export const clearError = createAction("createAdmin/clearError");

const createAdminSlice = createSlice({
  name: "createAdmin",
  initialState,
  reducers: {
    setUserCreated: (state, action) => {
      state.userCreated = action.payload;
    },
    clearError: (state, action) => {
      state.errorCreate = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // CREAR ADMIN

      .addCase(createNewAdmin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createNewAdmin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userCreated = action.payload;
        // state.userSession = action.payload;
        state.errorCreate = null;
      })
      .addCase(createNewAdmin.rejected, (state, action) => {
        state.status = "rejected";
        state.errorCreate = action.error.message;
      })

      // OBTENER TODOS LOS ADMINS

      .addCase(getAllAdmins.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllAdmins.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allAdmins = [...action.payload];
        state.error = null;
      })
      .addCase(getAllAdmins.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })

      // BANEAR ADMIN

      .addCase(banUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(banUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        const sub = action.payload; // acá tenemos el sub
        const user = state.allAdmins.find((user) => user.sub === sub); //buscamos en el estado allUsers al usuario
        if (user) {
          // que corresponde a nuestro sub y verificamos si tenemos el user.
          user.erased = !user.erased; // acá cambiamos la propiedad de borrado, si era true ahora es false y viceversa
          if (user.erased) {
            //si la propiedad borrado es true
            state.bannedAdmins.push(user); //agrega el usuario al array bannedUser
          } else {
            state.bannedAdmins = state.bannedAdmins.filter(
              (bannedUser) => bannedUser.sub !== sub
            ); // si borrado es false, filtra
          } // y devuelve los usuarios baneados diferentes a ese sub
        }
        state.error = null;
      })
      .addCase(banUser.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });
  },
});

export default createAdminSlice.reducer;
