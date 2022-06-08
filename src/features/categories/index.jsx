import { Route, Routes } from 'react-router-dom';
import ListCategory from './pages/ListCategory/ListCategory';
import React from 'react';

export default function CategoriesFeature() {
  return (
    <>
      <Routes>
        <Route index element={<ListCategory />} />
        {/* <Route path="/add-update" element={<AddUpdateCategory />} /> */}
      </Routes>
    </>
  );
}
