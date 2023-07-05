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
import clientReviewsReducer from './Features/reviews/clientReviewsSlice';
import adminReviewsReducer from './Features/reviews/adminReviewsSlice';
import ongoingOrdersReducer from './Features/admin/ongoingOrders/ongoingOrdersSlice';
import profileReducer from "./Features/profile/profileSlice";
import createAdminSliceReducer from "./Features/SuperAdmin/createAdmin/createAdminSlice";
import profileSuperAdminSliceReducer from "./Features/SuperAdmin/profileSuperAdmin/profileSuperAdminSlice";
import photoSuperAdminSliceReducer from "./Features/SuperAdmin/photoSuperAdmin/photoSuperAdminSlice";

const store = configureStore({
    reducer: {
        adminStatistics: adminStatisticsReducer,
        adminClients: adminClientsReducer,
        adminCategories: adminCategoriesReducer,
        adminBrands: adminBrandsReducer,
        adminProducts: adminProductsReducer, 
        adminReviews: adminReviewsReducer, 
        clientBrands: clientBrandsReducer,
        clientCategories: clientCategoriesReducer,
        clientProducts: clientProductsReducer, 
        clientReviews: clientReviewsReducer,
        logInAndSignUp: logInAndSignUpReducer,
        cart: cartReducer,
        payment: paymentReducer,
        photos: photosReducer,
        history: historyReducer, 
        ongoingOrders: ongoingOrdersReducer,
        profile:profileReducer,
        createAdmin: createAdminSliceReducer,
        profileSuperAdmin: profileSuperAdminSliceReducer,
        photoSuperAdmin: photoSuperAdminSliceReducer,
    }
});

export default store;