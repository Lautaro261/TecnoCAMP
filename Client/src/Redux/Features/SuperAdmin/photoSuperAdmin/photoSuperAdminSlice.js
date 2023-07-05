import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  photos: []
};

export const setPhotos = createAction("photoSuperAdmin/setPhotos");
export const removePhoto = createAction("photoSuperAdmin/removePhoto");
export const resetPhotos = createAction("photoSuperAdmin/resetPhotos");

const photoSuperAdminSlice = createSlice({
  name: "photoSuperAdmin",
  initialState,
  reducers: {
    setPhotos: (state, action) => {
      state.photos = [...state.photos, action.payload];
    },
    removePhoto: (state, action) => {
      const filteredPhotos = state.photos.filter(photo => photo !== action.payload);
      state.photos = filteredPhotos;
    },
    resetPhotos: (state, action) => {
      state.photos = action.payload;
    }
  }
});

export default photoSuperAdminSlice.reducer;