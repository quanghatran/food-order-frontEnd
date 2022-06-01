import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/user/userSlice';
import categoriesReducer from '../features/categories/categoriesSlice';
import userManagerReducer from '../features/userManager/userManagerSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  userManager: userManagerReducer,
  categories: categoriesReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
