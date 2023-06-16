import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './Features/admin/adminSlice';
import clientBrandsSlice from './Features/brands/clientBrandsSlice';
import clientCategoriesSlice from './Features/categories/clientCategoriesSlice';
import clientProductsSlice from './Features/products/clientProductsSlice';

const store = configureStore({
  reducer: {
    admin: adminReducer,
    clientBrands: clientBrandsSlice,
    clientCategories: clientCategoriesSlice,
    clientProducts: clientProductsSlice
  }
});

export default store;