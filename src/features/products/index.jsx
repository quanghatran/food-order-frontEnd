import { Route, Routes, useLocation } from 'react-router-dom';
import AddUpdateProduct from './Pages/AddUpdateProduct/AddUpdateProduct';
import ListProduct from './Pages/ListProduct/ListProduct';
import React from 'react';

export default function ProductsFeature() {
  return (
    <>
      <Routes>
        <Route index element={<ListProduct />} />
        <Route path="add" element={<AddUpdateProduct />} />
        <Route path="/:productId" element={<AddUpdateProduct />} />
      </Routes>
    </>
  );
}
