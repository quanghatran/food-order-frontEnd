import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import Categories from './pages/Categories/Categories';
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
          <Route path="/categories/:categoryParam" element={<Categories />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}
