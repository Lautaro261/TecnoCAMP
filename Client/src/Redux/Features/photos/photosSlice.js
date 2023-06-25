import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  photos: []
};

export const setPhotos = createAction("photos/setPhotos");
export const removePhoto = createAction("photos/removePhoto");

const photosSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {
    setPhotos: (state, action) => {
      state.photos = [...state.photos, action.payload];
    },
    removePhoto: (state, action) => {
      const filteredPhotos = state.photos.filter(photo => photo !== action.payload);
      state.photos = filteredPhotos;
    }
  }
});

export default photosSlice.reducer;