import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/user/userSlice';
import categoriesReducer from '../features/categories/categoriesSlice';
import userManagerReducer from '../features/userManager/userManagerSlice';
import saleCodesReducer from '../features/saleCode/saleCodeSlice';
import storeReducer from '../features/store/storeSlice';
import productsReducer from '../features/products/productSlice';
import storeManagerReducer from '../features/storeManager/storeManagerSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  userManager: userManagerReducer,
  categories: categoriesReducer,
  saleCodes: saleCodesReducer,
  store: storeReducer,
  products: productsReducer,
  storeManager: storeManagerReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
