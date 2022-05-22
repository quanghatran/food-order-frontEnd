import { Box } from '@mui/system';
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../../../assets/images/common/logo_food_order.png';
import userIcon from '../../../../assets/images/user/user-icon.png';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import './header.scss';
import { Badge, IconButton, Typography } from '@mui/material';

export default function Header({ isLoggedIn }) {
  const [totalPrice, setTotalPrice] = useState(0);

  return (
    <div className="headerWrapper paddingLeftRight">
      <Box className="headerNav">
        <Link to="/">
          <img className="headerNavLogo" src={logo} alt="logo" />
        </Link>
        <Box className="headerNavListNav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/category">Categories</NavLink>
          <NavLink to="/menu">Products</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/help">Help</NavLink>
        </Box>
      </Box>

      <Box className="headerAccount">
        <Link to="/account">
          <img className="headerNavLogo" src={userIcon} alt="user" />
        </Link>
        <Box className="headerCart">
          <Badge badgeContent={4} color="secondary">
            <ShoppingBasketOutlinedIcon fontSize="large" />
          </Badge>
          <Typography variant="h5" className="totalPrice">
            {totalPrice} <span style={{ fontWeight: '400', fontSize: '18px' }}>₫</span>
          </Typography>
          <IconButton color="primary" className="cartActionBtn" aria-label="add to shopping cart">
            <ArrowRightOutlinedIcon fontSize="medium" />
          </IconButton>
        </Box>
      </Box>
    </div>
  );
}
