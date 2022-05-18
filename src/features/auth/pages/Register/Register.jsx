import { Alert, Button, Container, CssBaseline, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoFoodApp from '../../../../assets/images/common/logo_food_order.png';
import './register.scss';

export default function Register() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');

  const [signInError, setSignInError] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();

    // TODO: fetch call api to register, save jwt into local storage, display toastify, redirect to previous page,...

    const dataRegister = {
      phoneNumber,
      password,
    };

    console.log('data register: ', dataRegister);
  };

  return (
    <div className="registerWrapper">
      <div className="registerBlock">
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className="registerPaper">
            <img className="registerLogoApp" src={logoFoodApp} alt="logo_app" />
            <Typography component="h1" variant="h3" className="titleRegister">
              Food Order
            </Typography>
            <Typography component="h3" variant="h5" className="subtitleRegister">
              Đăng Ký
            </Typography>
            <form className="registerForm" autoComplete="off" onSubmit={handleRegister}>
              <TextField
                label="Số điện thoại"
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
                label="Mật khẩu"
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
                label="Nhập lại mật khẩu"
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
              {signInError && (
                <Alert
                  variant="filled"
                  severity="error"
                  style={{ marginTop: '1rem', justifyContent: 'center' }}
                >
                  Tài khoản hoặc mật khẩu không chính xác
                </Alert>
              )}
              <Box className="registerLinkNav">
                <Link to="/auth/login">Đã có tài khoản?</Link>

                {/* <Link to="/forgot-password">Quên mật khẩu</Link> */}
              </Box>
              <Button
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                fullWidth
                className="registerButton"
              >
                Đăng ký
              </Button>
            </form>
          </div>
        </Container>
      </div>
    </div>
  );
}
