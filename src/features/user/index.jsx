import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import Categories from './pages/Categories/Categories';
import './user.scss';
import Cart from './pages/Cart/Cart';
import ProductPage from './pages/ProductPage/ProductPage';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import RestaurantPage from './pages/RestaurantPage/RestaurantPage';
import ProductStore from './pages/ProductStore/ProductStore';
import Profile from './pages/Profile/Profile';
import OrderHistory from './pages/OrderHistory/OrderHistory';

export default function UserFeature() {
  const isLoggedIn = false;

  return (
    <div className="userFeatureWrapper">
      <Header isLoggedIn={isLoggedIn} />
      <div className="userFeatureBody marginLeftRight">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/categories/:categoryParam" element={<Categories />} />
          <Route path="/category" element={<Categories />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/restaurant" element={<RestaurantPage />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/restaurant/:storeId" element={<ProductStore />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/myAccount" element={<Profile />} />
          <Route path="/orderHistory" element={<OrderHistory />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}
