import { Route, Routes } from 'react-router-dom';
import ListStoreManager from './pages/ListStoreManager/ListStoreManager';

export default function StoresManagerFeature() {
  return (
    <>
      <Routes>
        <Route index element={<ListStoreManager />} />
        {/* <Route path="add" element={<AddUpdateUserManager />} /> */}
        {/* <Route path="/:userId" element={<AddUpdateUserManager />} /> */}
      </Routes>
    </>
  );
}
