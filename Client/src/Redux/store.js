import { configureStore  } from "@reduxjs/toolkit";
import adminReducer from './Features/admin/adminSlice';
import clientBrandsReducer from './Features/brands/clientBrandsSlice';
import clientCategoriesReducer from './Features/categories/clientCategoriesSlice';
import clientProductsReducer from './Features/products/clientProductsSlice';

const store = configureStore({
    reducer: {
        admin: adminReducer,
        clientBrands: clientBrandsReducer,
        clientCategories: clientCategoriesReducer,
        clientProducts: clientProductsReducer
    }
});

export default store;