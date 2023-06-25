import { configureStore  } from "@reduxjs/toolkit";
import adminCategoriesReducer from './Features/admin/categories/adminCategoriesSlice';
import adminProductsReducer from './Features/admin/products/adminProductsSlice';
import clientBrandsReducer from './Features/brands/clientBrandsSlice';
import clientCategoriesReducer from './Features/categories/clientCategoriesSlice';
import clientProductsReducer from './Features/products/clientProductsSlice';
import logInAndSignUpReducer from './Features/login/logInAndSignUpSlice';
import cartReducer from "./Features/cart/cartSlice";
import paymentReducer from "./Features/payment/paymentSlice";

const store = configureStore({
    reducer: {
        adminCategories: adminCategoriesReducer,
        adminProducts: adminProductsReducer,
        clientBrands: clientBrandsReducer,
        clientCategories: clientCategoriesReducer,
        clientProducts: clientProductsReducer,
        logInAndSignUp: logInAndSignUpReducer,
        cart: cartReducer,
        payment: paymentReducer
    }
});

export default store;