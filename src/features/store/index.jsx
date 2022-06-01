import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavigationAdmin from '../../components/common/NavigationAdmin/NavigationAdmin';
import { listStoreNavbar } from '../../constants/store';
import OrderFeature from '../order';
import ProductsFeature from '../products';
import HomePage from './pages/HomePage/HomePage';
import './store.scss';

export default function StoreFeature() {
  return (
    <div className="storeFeatureWrapper">
      <NavigationAdmin listNavbar={listStoreNavbar} />
      <div className="storeContentWrapper">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/orders/*" element={<OrderFeature />} />
          <Route path="/products/*" element={<ProductsFeature />} />
          {/* <Route path="/register" element={<Register />} /> */}
          {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
        </Routes>
      </div>
    </div>
  );
}
