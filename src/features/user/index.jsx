import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import Category from './pages/Category/Category';
import './user.scss';
import Cart from './pages/Cart/Cart';

export default function UserFeature() {
  const isLoggedIn = false;

  return (
    <div className="userFeatureWrapper">
      <Header isLoggedIn={isLoggedIn} />
      <div className="userFeatureBody marginLeftRight">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/category/:categoryID" element={<Category />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}
