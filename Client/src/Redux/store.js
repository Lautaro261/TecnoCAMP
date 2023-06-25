import { configureStore  } from "@reduxjs/toolkit";
import adminCategoriesReducer from './Features/admin/categories/adminCategoriesSlice';
import adminBrandsReducer from './Features/admin/brands/adminBrandsSlice';
import adminProductsReducer from './Features/admin/products/adminProductsSlice';
import clientBrandsReducer from './Features/brands/clientBrandsSlice';
import clientCategoriesReducer from './Features/categories/clientCategoriesSlice';
import clientProductsReducer from './Features/products/clientProductsSlice';
import logInAndSignUpReducer from './Features/login/logInAndSignUpSlice';
import cartReducer from "./Features/cart/cartSlice";
import paymentReducer from "./Features/payment/paymentSlice";
import photosReducer from "./Features/photos/photosSlice";

const store = configureStore({
    reducer: {
        adminCategories: adminCategoriesReducer,
        adminBrands: adminBrandsReducer,
        adminProducts: adminProductsReducer,
        clientBrands: clientBrandsReducer,
        clientCategories: clientCategoriesReducer,
        clientProducts: clientProductsReducer,
        logInAndSignUp: logInAndSignUpReducer,
        cart: cartReducer,
        payment: paymentReducer,
        photos: photosReducer
    }
});

export default store;