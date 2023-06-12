import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './Features/admin/adminSlice';
import productsClientReducer from './Features/productsClient/productsClientSlice';

const store = configureStore({
  reducer: {
    admin: adminReducer,
    productsClient: productsClientReducer
  }
});

export default store;