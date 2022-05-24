import { LoadingButton } from '@mui/lab';
import { Alert, Button, Container, CssBaseline, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { unwrapResult } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import logoFoodApp from '../../../../assets/images/common/logo_food_order.png';
import { postAuthLogin } from '../../authSlice';
import './login.scss';

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const loading = useSelector((state) => state.auth.loading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const dataLogin = {
      phoneNumber,
      password,
    };

    console.log(dataLogin);

    if (dataLogin) {
      const fetchLogin = async () => {
        try {
          const result = await dispatch(postAuthLogin(dataLogin));

          unwrapResult(result);
          toast.success('Create User Success');
          // navigate('/admin/user');
        } catch (error) {
          toast.error(`Login Failed`);
        }
      };

      fetchLogin();
    }
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

              <Box className="loginLinkNav">
                <Link to="/auth/register">Don`t have account?</Link>

                <Link to="/auth/forgot-password">Forgot password</Link>
              </Box>

              <LoadingButton
                loading={loading}
                loadingPosition="end"
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                fullWidth
                className="loginButton"
              >
                Login
              </LoadingButton>
            </form>
          </div>
        </Container>
      </div>
    </div>
  );
}
