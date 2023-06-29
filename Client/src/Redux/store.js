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
import adminClientsReducer from './Features/admin/clients/adminClientsSlice'
import adminStatisticsReducer from "./Features/admin/Statistics/adminStatistics";
import historyReducer from "./Features/history/historySlice";

const store = configureStore({
    reducer: {
        adminStatistics: adminStatisticsReducer,
        adminClients: adminClientsReducer,
        adminCategories: adminCategoriesReducer,
        adminBrands: adminBrandsReducer,
        adminProducts: adminProductsReducer,
        clientBrands: clientBrandsReducer,
        clientCategories: clientCategoriesReducer,
        clientProducts: clientProductsReducer,
        logInAndSignUp: logInAndSignUpReducer,
        cart: cartReducer,
        payment: paymentReducer,
        photos: photosReducer,
        history: historyReducer
    }
});

export default store;