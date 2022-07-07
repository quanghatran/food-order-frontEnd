import { Route, Routes } from 'react-router-dom';
import NavigationAdmin from '../../components/common/NavigationAdmin/NavigationAdmin';
import { listAdminNavbar } from '../../constants/admin/';
import CategoriesFeature from '../categories';
import StoresManagerFeature from '../storeManager';
import UserManagerFeature from '../userManager';
import './admin.scss';
import AdminInfo from './pages/AdminInfo/AdminInfo';
import HomePage from './pages/HomePage/HomePage';
import OrderManager from './pages/OrderManager/OrderManager';
import ProductManager from './pages/ProductManager/ProductManager';

export default function AdminFeature() {
  return (
    <div className="adminFeatureWrapper">
      <NavigationAdmin listNavbar={listAdminNavbar} />
      <div className="adminContentWrapper">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/stores/*" element={<StoresManagerFeature />} />

          <Route path="/products/*" element={<ProductManager />} />
          <Route path="/user/*" element={<UserManagerFeature />} />

          <Route path="/category/*" element={<CategoriesFeature />} />
          <Route path="/orders" element={<OrderManager />} />
          <Route path="/info" element={<AdminInfo />} />
          {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
        </Routes>
      </div>
    </div>
  );
}
