import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { purple } from '@mui/material/colors';
import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ProtectedAdmin from './components/common/ProtectedRoutes/admin';
import ProtectedStore from './components/common/ProtectedRoutes/store';
import AdminFeature from './features/admin';
import AuthFeature from './features/auth';
import StoreFeature from './features/store';
import UserFeature from './features/user';

const theme = createTheme({
  palette: {
    primary: {
      main: '#34495e',
    },
    secondary: purple,
  },
});

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading ...</div>}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path="/auth/*" element={<AuthFeature />} />

              <Route path="/*" element={<UserFeature />} />

              <Route
                path="/store/*"
                element={
                  <ProtectedStore>
                    <StoreFeature />
                  </ProtectedStore>
                }
              />

              <Route
                path="/admin/*"
                element={
                  <ProtectedAdmin>
                    <AdminFeature />
                  </ProtectedAdmin>
                }
              />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </Suspense>
    </>
  );
}

export default App;
