import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './order.scss';
import ListOrder from './pages/ListOrder/ListOrder';

export default function OrderFeature() {
  return (
    <div className="orderFeature">
      <Routes>
        <Route index element={<ListOrder />} />
      </Routes>
    </div>
  );
}
