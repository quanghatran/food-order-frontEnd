import { Route, Routes } from 'react-router-dom';
import NavigationAdmin from '../../components/common/NavigationAdmin/NavigationAdmin';
import { listStoreNavbar } from '../../constants/store';
import OrderFeature from '../order';
import ProductsFeature from '../products';
import SaleCodeFeature from '../saleCode';
import HomePage from './pages/HomePage/HomePage';
import Info from './pages/Info/Info';
import './store.scss';
import React from 'react';

export default function StoreFeature() {
  return (
    <div className="storeFeatureWrapper">
      <NavigationAdmin listNavbar={listStoreNavbar} />
      <div className="storeContentWrapper">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/orders/*" element={<OrderFeature />} />
          <Route path="/sale-codes/*" element={<SaleCodeFeature />} />
          <Route path="/products/*" element={<ProductsFeature />} />
          <Route path="/info" element={<Info />} />
          {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
        </Routes>
      </div>
    </div>
  );
}
