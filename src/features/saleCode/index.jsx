import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ListSaleCode from './Pages/ListSaleCode/ListSaleCode';
import AddEditSaleCode from './Pages/AddEditSaleCode/AddEditSaleCode';

export default function SaleCodeFeature() {
  return (
    <Routes>
      <Route index element={<ListSaleCode />} />
      <Route path="add" element={<AddEditSaleCode />} />
      <Route path="/:saleCodeId" element={<AddEditSaleCode />} />
    </Routes>
  );
}
