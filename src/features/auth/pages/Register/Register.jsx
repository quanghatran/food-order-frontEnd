import { LoadingButton } from '@mui/lab';
import { Alert, Button, Container, CssBaseline, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { unwrapResult } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import logoFoodApp from '../../../../assets/images/common/logo_food_order.png';
import { postAuthRegister } from '../../authSlice';
import './register.scss';

export default function Register() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [retypePassword, setRetypePassword] = useState('');

  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const data = {
      name,
      phoneNumber,
      email,
      password,
    };

    if (data) {
      try {
        const resultRegister = await dispatch(postAuthRegister(data));
        unwrapResult(resultRegister);

        toast.success('Create User Success');
        navigate('/');
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="registerWrapper">
      <div className="registerBlock">
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className="registerPaper">
            <Link to="/">
              <img className="registerLogoApp" src={logoFoodApp} alt="logo_app" />
            </Link>

            <Typography component="h1" variant="h3" className="titleRegister">
              Food Order
            </Typography>
            <Typography component="h3" variant="h5" className="subtitleRegister">
              Register
            </Typography>
            <form className="registerForm" autoComplete="off" onSubmit={handleRegister}>
              <TextField
                label="User Name"
                color="primary"
                validate="true"
                type="text"
                onChange={(e) => setName(e.target.value)}
                autoFocus
                fullWidth
                variant="outlined"
                margin="normal"
                required
              />
              <TextField
                label="Email"
                color="primary"
                validate="true"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                fullWidth
                variant="outlined"
                margin="normal"
                required
              />
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
              <TextField
                label="Retype Password"
                variant="outlined"
                color="primary"
                validate="true"
                type="password"
                fullWidth
                onChange={(e) => setRetypePassword(e.target.value)}
                margin="normal"
                required
                autoComplete="current-password"
              />

              <Box className="registerLinkNav">
                <Link to="/auth/login">Already have a account?</Link>
              </Box>
              <LoadingButton
                loading={loading}
                // loadingPosition="end"
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                fullWidth
                className="loginButton"
              >
                REGISTER
              </LoadingButton>
            </form>
          </div>
        </Container>
      </div>
    </div>
  );
}
