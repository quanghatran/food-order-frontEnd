import { LoadingButton } from '@mui/lab';
import { Box, Container, CssBaseline, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import authApi from '../../../../api/authApi';
import logoFoodApp from '../../../../assets/images/common/logo_food_order.png';
import '../Login/login.scss';
import React from 'react';

export default function VerifyEmail() {
  const loading = useSelector((state) => state.auth.loading);
  const { tokenVerify } = useParams();
  const navigate = useNavigate();
  const [disableButton, setDisableButton] = useState(false);

  localStorage.setItem('verifyToken', tokenVerify);

  const [email, setEmail] = useState(null);

  const handleReactive = async (e) => {
    e.preventDefault();
    try {
      await authApi.postReactive({ email });
      toast.success('Send verify request success, please check email to continue');
      setDisableButton(false);
    } catch (error) {
      toast.success('Send verify request failed');
      console.log(error);
    }
  };

  const handleClickVerify = async () => {
    if (tokenVerify) {
      try {
        await authApi.getUserVerify();
        await localStorage.removeItem('verifyToken');
        toast.success('Verify success, login to continue');

        navigate('/auth/login');
      } catch (error) {
        console.log(error);
        toast.error('Verify failed, please try again!');
        localStorage.removeItem('verifyToken');
      }
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
              Verify Email
            </Typography>

            {!tokenVerify ? (
              <form className="registerForm" autoComplete="off" onSubmit={handleReactive}>
                <TextField
                  label="Email"
                  color="primary"
                  validate="true"
                  type="email"
                  autoFocus
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  required
                />
                <Box className="loginLinkNav">
                  <Link to="/auth/login">Back to login page</Link>
                </Box>
                <LoadingButton
                  loading={loading}
                  disabled={disableButton}
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                  fullWidth
                  className="loginButton"
                >
                  Send Verification Request
                </LoadingButton>
              </form>
            ) : (
              <Box>
                <Box className="loginLinkNav">
                  <Link style={{ marginTop: '20px' }} to="/auth/login">
                    Back to login page
                  </Link>
                </Box>
                <LoadingButton
                  style={{ marginTop: '40px' }}
                  loading={loading}
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                  fullWidth
                  className="loginButton"
                  onClick={handleClickVerify}
                >
                  Verify Email
                </LoadingButton>
              </Box>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
}
