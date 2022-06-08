import { Route, Routes } from 'react-router-dom';
import NavigationAdmin from '../../components/common/NavigationAdmin/NavigationAdmin';
import CategoriesFeature from '../categories';
import Products from '../products';
import StoresManagerFeature from '../storeManager';
import UserManagerFeature from '../userManager';
import './admin.scss';
import HomePage from './pages/HomePage/HomePage';
import { listAdminNavbar } from '../../constants/admin/';
import React from 'react';
import ProductManager from './pages/ProductManager/ProductManager';

export default function AdminFeature() {
  return (
    <div className="adminFeatureWrapper">
      <NavigationAdmin listNavbar={listAdminNavbar} />
      <div className="adminContentWrapper">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/stores/*" element={<StoresManagerFeature />} />

          <Route path="/products/*" element={<ProductManager />} />
          <Route path="/user/*" element={<UserManagerFeature />} />

          <Route path="/category/*" element={<CategoriesFeature />} />
          {/* <Route path="/register" element={<Register />} /> */}
          {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
        </Routes>
      </div>
    </div>
  );
}
