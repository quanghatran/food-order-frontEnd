import { LoadingButton } from '@mui/lab';
import { Box, Container, CssBaseline, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import authApi from '../../../../api/authApi';
import logoFoodApp from '../../../../assets/images/common/logo_food_order.png';
import './forgotPassword.scss';
import React from 'react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleForgotPassword = (e) => {
    e.preventDefault();

    const fetchGetPassword = async () => {
      try {
        const result = await authApi.postForgotPassword({ email });

        toast.success('Please check your email to reset password');
      } catch (error) {
        console.log(error);
        toast.error(`Resetpassword failed`);
      }
    };

    fetchGetPassword();
  };

  return (
    <div className="forgotPasswordWrapper">
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
              Forgot Password
            </Typography>
            <form className="loginForm" autoComplete="off" onSubmit={handleForgotPassword}>
              <TextField
                label="Email"
                color="primary"
                validate="true"
                type="emal"
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                fullWidth
                variant="outlined"
                margin="normal"
                required
              />

              <Box className="loginLinkNav">
                <Link to="/auth/login">Back to login page?</Link>
              </Box>

              <LoadingButton
                // loadingPosition="end"
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                fullWidth
                className="loginButton"
              >
                Reset Password
              </LoadingButton>
            </form>
          </div>
        </Container>
      </div>
    </div>
  );
}
