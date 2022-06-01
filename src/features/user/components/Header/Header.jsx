import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import { Badge, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../../../assets/images/common/logo_food_order.png';
import userIcon from '../../../../assets/images/user/user-icon.png';
import './header.scss';

export default function Header({ isLoggedIn }) {
  const navigate = useNavigate();

  const [totalPrice, setTotalPrice] = useState(0);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const handleMoveToCart = () => {
    navigate('/cart');
  };

  return (
    <div className="headerWrapper paddingLeftRight">
      <Box className="headerNav">
        <Link to="/">
          <img className="headerNavLogo" src={logo} alt="logo" />
        </Link>
        <Box className="headerNavListNav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/categories">Categories</NavLink>
          <NavLink to="/menu">Products</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/help">Help</NavLink>
        </Box>
      </Box>

      <Box className="headerAccount">
        {userInfo ? (
          <>
            <Link to="/account">
              <img
                className="headerNavLogo avatarUser"
                src={userInfo.avatar || userIcon}
                alt="user"
              />
            </Link>
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
          <Badge badgeContent={4} color="secondary">
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
    </div>
  );
}
