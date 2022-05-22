import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ListUserManager from './Pages/ListUserManager/ListUserManager';
import AddUpdateUserManager from './Pages/AddUpdateUserManager/AddUpdateUserManager';

export default function UserManagerFeature() {
  return (
    <>
      <Routes>
        <Route index element={<ListUserManager />} />
        <Route path="add" element={<AddUpdateUserManager />} />
        <Route path="/:userId" element={<AddUpdateUserManager />} />
      </Routes>
    </>
  );
}
