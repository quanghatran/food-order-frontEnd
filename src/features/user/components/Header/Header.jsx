import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import { Badge, Button, IconButton, Typography } from '@mui/material';
import Fade from '@mui/material/Fade';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../../../assets/images/common/logo_food_order.png';
import userIcon from '../../../../assets/images/user/user-icon.png';
import './header.scss';
export default function Header({ isLoggedIn }) {
  const [quantity, setQuantity] = useState(null);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { totalQuantityItemCart } = useSelector((state) => state.user);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [totalPrice, setTotalPrice] = useState(0);
  const userInfo = JSON.parse(localStorage.getItem('accountInfo'));
  const handleMoveToCart = () => {
    navigate('/cart');
  };
  const handleLogout = () => {
    setAnchorEl(null);
    localStorage.removeItem('account');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('accountInfo');
    navigate('/auth/login');
  };
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const total = cart?.reduce((acc, curr) => (acc = acc + curr.quantity), 0);
    setQuantity(total);
  }, [quantity]);
  console.log(totalQuantityItemCart);
  return (
    <div className="headerWrapper paddingLeftRight">
      <Box className="headerNav">
        <Link to="/">
          <img className="headerNavLogo" src={logo} alt="logo" />
        </Link>
        <Box className="headerNavListNav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/category">Categories</NavLink>
          <NavLink to="/product">Products</NavLink>
          <NavLink to="/restaurant">Restaurants</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          {/* <NavLink to="/help">Help</NavLink> */}
        </Box>
      </Box>
      <Box className="headerAccount">
        {userInfo ? (
          <>
            <Button
              id="fade-button"
              aria-controls={open ? 'fade-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <img
                className="headerNavLogo avatarUser"
                src={userInfo.avatar || userIcon}
                alt="user"
              />
            </Button>
            <IconButton size="large" aria-label="show new notifications" color="inherit">
              <Badge badgeContent={0} color="secondary">
                <NotificationsIcon fontSize="medium" />
              </Badge>
            </IconButton>
          </>
        ) : (
          <Link to="/auth/login">Login</Link>
        )}
        <Box className="headerCart">
          <Badge
            badgeContent={quantity === undefined ? totalQuantityItemCart : quantity}
            color="secondary"
          >
            <ShoppingBasketOutlinedIcon fontSize="large" />
          </Badge>
          <Typography variant="h5" className="totalPrice">
            {totalPrice} <span style={{ fontWeight: '400', fontSize: '18px' }}>₫</span>
          </Typography>
          <IconButton
            color="primary"
            className="cartActionBtn"
            aria-label="add to shopping cart"
            onClick={handleMoveToCart}
          >
            <ArrowRightOutlinedIcon fontSize="medium" />
          </IconButton>
        </Box>
      </Box>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose} className="Header--Item">
          <Link to="/myAccount">Profile</Link>
        </MenuItem>
        <MenuItem onClick={handleClose} className="Header--Item">
          <Link to="/orderHistory">Order History</Link>
        </MenuItem>
        <MenuItem onClick={handleLogout} className="Header--Item">
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
