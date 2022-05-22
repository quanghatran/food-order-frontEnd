import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';

export default function StoreFeature() {
  return (
    <div className="storeFeatureWrapper">
      <Routes>
        <Route index element={<HomePage />} />
        {/* <Route path="/register" element={<Register />} /> */}
        {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
      </Routes>
    </div>
  );
}
