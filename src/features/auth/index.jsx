import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import VerifyEmail from './pages/VerifyEmail/VerifyEmail';

export default function AuthFeature() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/store-register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify/:tokenVerify" element={<VerifyEmail />} />
        <Route path="/verify/*" element={<VerifyEmail />} />
      </Routes>
    </>
  );
}
