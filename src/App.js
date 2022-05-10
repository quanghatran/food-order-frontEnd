import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { purple } from '@mui/material/colors';
import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminFeature from './features/admin';

const theme = createTheme({
  palette: {
    primary: {
      main: '#34495e',
    },
    secondary: purple,
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading ...</div>}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path="/*" element={<AdminFeature />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </Suspense>
    </>
  );
}

export default App;
