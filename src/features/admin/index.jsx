import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavigationAdmin from '../../components/common/NavigationAdmin/NavigationAdmin';
import HomePage from './pages/HomePage/HomePage';
import Products from '../products';
import UserManagerFeature from '../userManager';
import './admin.scss';

export default function AdminFeature() {
  return (
    <div className="adminFeatureWrapper">
      <NavigationAdmin />
      <div className="adminContentWrapper">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/product/*" element={<Products />} />
          <Route path="/user/*" element={<UserManagerFeature />} />
          {/* <Route path="/register" element={<Register />} /> */}
          {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
        </Routes>
      </div>
    </div>
  );
}
