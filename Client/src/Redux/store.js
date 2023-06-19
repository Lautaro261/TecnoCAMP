import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from './storage';
import adminReducer from './Features/admin/adminSlice';
import clientBrandsReducer from './Features/brands/clientBrandsSlice';
import clientCategoriesReducer from './Features/categories/clientCategoriesSlice';
import clientProductsReducer from './Features/products/clientProductsSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
      'admin',
      'clientBrands',
      'clientCategories',
      'clientProducts'
  ]
};

const rootReducer = combineReducers({
  admin: adminReducer,
  clientBrands: clientBrandsReducer,
  clientCategories: clientCategoriesReducer,
  clientProducts: clientProductsReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});

const persistor = persistStore(store);

export { store, persistor };