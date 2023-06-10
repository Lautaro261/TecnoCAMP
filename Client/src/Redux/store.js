import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './Features/admin/adminSlice';

const store = configureStore({
  reducer: {
    admin: adminReducer,
  }
});

export default store;