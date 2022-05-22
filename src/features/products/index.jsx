import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AddUpdateProduct from './Pages/AddUpdateProduct/AddUpdateProduct';
import ListProduct from './Pages/ListProduct/ListProduct';

export default function Products() {
  return (
    <>
      <Routes>
        <Route index element={<ListProduct />} />
        <Route path="add" element={<AddUpdateProduct />} />
        {/* <Route path="/:userId" element={<AddUpdateUserManager />} /> */}
      </Routes>
    </>
  );
}
