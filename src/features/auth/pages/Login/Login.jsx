import { Alert, Button, Container, CssBaseline, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoFoodApp from '../../../../assets/images/common/logo_food_order.png';
import './login.scss';

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [signInError, setSignInError] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    // TODO: fetch call api to login, save jwt into local storage, display toastify, redirect to previous page,...

    const dataLogin = {
      phoneNumber,
      password,
    };

    console.log('data login: ', dataLogin);
  };

  return (
    <div className="loginWrapper">
      <div className="loginBlock">
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className="loginPaper">
            <Link to="/">
              <img className="loginLogoApp" src={logoFoodApp} alt="logo_app" />
            </Link>
            <Typography component="h1" variant="h3" className="titleLogin">
              Food Order
            </Typography>
            <Typography component="h3" variant="h5" className="subtitleLogin">
              Login Page
            </Typography>
            <form className="loginForm" autoComplete="off" onSubmit={handleLogin}>
              <TextField
                label="Phone Number"
                color="primary"
                validate="true"
                type="number"
                onChange={(e) => setPhoneNumber(e.target.value)}
                autoFocus
                fullWidth
                variant="outlined"
                margin="normal"
                required
              />
              <TextField
                label="Password"
                variant="outlined"
                color="primary"
                validate="true"
                type="password"
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
                autoComplete="current-password"
              />
              {signInError && (
                <Alert
                  variant="filled"
                  severity="error"
                  style={{ marginTop: '1rem', justifyContent: 'center' }}
                >
                  Account or password is not correct!
                </Alert>
              )}
              <Box className="loginLinkNav">
                <Link to="/auth/register">Don`t have account?</Link>

                <Link to="/auth/forgot-password">Forgot password</Link>
              </Box>
              <Button
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                fullWidth
                className="loginButton"
              >
                Login
              </Button>
            </form>
          </div>
        </Container>
      </div>
    </div>
  );
}
