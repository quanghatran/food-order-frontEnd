import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { purple } from '@mui/material/colors';
import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import AdminFeature from './features/admin';
import AuthFeature from './features/auth';

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
              <Route path="/*" element={<AdminFeature />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </Suspense>
    </>
  );
}

export default App;
