import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import {
  Badge,
  Button,
  ClickAwayListener,
  Grow,
  IconButton,
  MenuList,
  Popper,
  Typography,
} from '@mui/material';
import Fade from '@mui/material/Fade';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/system';
import { unwrapResult } from '@reduxjs/toolkit';
import dateFormat from 'dateformat';
import { useEffect, useRef, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../../../assets/images/common/logo_food_order.png';
import userIcon from '../../../../assets/images/user/user-icon.png';
import CartPopup from '../../../../components/common/CartPopup/CartPopup';
import { patchSeenNotification, userGetNotification } from '../../userSlice';
import './header.scss';

export default function Header({ isLoggedIn }) {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState([]);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const { totalQuantityItemCart } = useSelector((state) => state.user);
  const [anchorPopUp, setAnchorPopUp] = useState(null);
  const [notifications, setNotifications] = useState(null);
  const [openNotification, setOpenNotification] = useState(false);
  const anchorRefNotification = useRef(null);
  const [isDataChange, setIsDataChange] = useState(false);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleHoverPopUp = (event) => {
    setAnchorPopUp(event.currentTarget);
  };

  const [totalPrice, setTotalPrice] = useState(0);
  const userInfo = JSON.parse(localStorage.getItem('accountInfo'));
  const handleMoveToCart = () => {
    navigate('/cart');
  };
  const handleLogout = () => {
    setAnchorEl(null);
    localStorage.clear();
    navigate('/auth/login');
  };

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const total = cart?.reduce((acc, curr) => (acc = acc + curr.quantity), 0);

    const totalPrice = cart?.reduce((acc, curr) => (acc = acc + curr.quantity * curr.price), 0);
    if (totalPrice) {
      localStorage.setItem('cartPrice', JSON.stringify(totalPrice));
    }

    if (totalPrice) {
      setTotalPrice(totalPrice);
    } else {
      setTotalPrice(0);
    }
    setQuantity(total);

    // get notifications of users
    const getNotification = async () => {
      try {
        const resultGetNotification = await dispatch(userGetNotification());
        setNotifications(resultGetNotification.payload);
      } catch (error) {
        console.log('get notification failed: ', error);
      }
    };

    getNotification();
  }, [totalQuantityItemCart]);

  console.log(notifications);

  const handleToggleNotification = () => {
    setOpenNotification((prevOpen) => !prevOpen);
  };

  const handleCloseNotification = (event) => {
    if (anchorRefNotification.current && anchorRefNotification.current.contains(event.target)) {
      return;
    }
    setOpenNotification(false);
  };

  // get notification for user
  useEffect(() => {
    const fetchGetNotification = async () => {
      if (userInfo && userInfo?.role === 'user') {
        try {
          const result = await dispatch(userGetNotification());
          unwrapResult(result);
          setNotifications(result.payload.slice(0, 10));
        } catch (error) {
          console.log('get notification admin falied: ', error);
        }
      }
    };

    fetchGetNotification();
  }, [dispatch, isDataChange]);

  const handleSeenNotification = async (id) => {
    if (id) {
      try {
        const result = await dispatch(patchSeenNotification(id));
        unwrapResult(result);
        setIsDataChange(!isDataChange);
      } catch (error) {
        console.log('get notification admin falied: ', error);
      }
    }
  };

  const handleGetBageNotifications = () => {
    if (notifications) {
      const numNotification = notifications.filter(
        (notification) => notification.status === 'unseen'
      ).length;

      return numNotification;
    }
  };

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
          <NavLink to="/cart">Cart</NavLink>
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
            <span style={{ position: 'relative' }}>
              <IconButton size="large" aria-label="show new notifications" color="inherit">
                <Badge badgeContent={handleGetBageNotifications()} color="secondary">
                  <NotificationsIcon
                    ref={anchorRefNotification}
                    id="composition-button-notification"
                    aria-controls={openNotification ? 'composition-menu-notification' : undefined}
                    aria-expanded={openNotification ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggleNotification}
                    fontSize="medium"
                  />
                </Badge>
              </IconButton>
              <Popper
                style={{
                  position: 'absolute',
                  top: '50px',
                  right: '0px',
                  zIndex: '10',
                  width: '250px',
                }}
                open={openNotification}
                anchorEl={openNotification.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
                    }}
                  >
                    <Box
                      style={{
                        backgroundColor: '#fff',
                        borderRadius: '5px',
                        boxShadow: '0 0.5rem 1rem rgb(0 0 0 / 15%)',
                      }}
                    >
                      <ClickAwayListener onClickAway={handleCloseNotification}>
                        <MenuList
                          autoFocusItem={openNotification}
                          id="composition-menu-notification"
                          aria-labelledby="composition-button-notification"
                        >
                          {(notifications && notifications?.length) > 0 ? (
                            notifications.map((notification) => (
                              <MenuItem
                                onClick={() => handleSeenNotification(notification.id)}
                                key={notification.id}
                              >
                                <div style={{ fontSize: '13px' }}>
                                  <div style={{ fontSize: '16px' }}>
                                    {notification.status === 'unseen' ? (
                                      <b>{notification.message}</b>
                                    ) : (
                                      <span>{notification.message}</span>
                                    )}
                                  </div>
                                  <span>
                                    {dateFormat(notification.created_at, 'hh:MM TT')} -{' '}
                                    {dateFormat(notification.created_at, 'dd/mm/yyyy')}
                                  </span>
                                </div>
                              </MenuItem>
                            ))
                          ) : (
                            <MenuItem>Don`t have any notification</MenuItem>
                          )}
                        </MenuList>
                      </ClickAwayListener>
                    </Box>
                  </Grow>
                )}
              </Popper>
            </span>
          </>
        ) : (
          <Link to="/auth/login">Login</Link>
        )}
        <Box className="headerCart">
          <Badge
            badgeContent={
              quantity?.length === 0 || quantity === undefined ? totalQuantityItemCart : quantity
            }
            color="secondary"
            onMouseOver={handleHoverPopUp}
          >
            <ShoppingBasketOutlinedIcon fontSize="large" />
          </Badge>
          <Typography variant="h5" className="totalPrice">
            <CurrencyFormat value={totalPrice} displayType={'text'} thousandSeparator={true} />đ
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
      <Box>
        <Menu
          anchorEl={anchorPopUp}
          open={Boolean(anchorPopUp)}
          onClose={() => setAnchorPopUp(null)}
          transitionComponent={Fade}
          className="CartPopup"
          style={{ marginTop: '7px', marginLeft: '-8px' }}
        >
          <MenuItem style={{ backgroundColor: '#fff' }}>
            <CartPopup />
          </MenuItem>
        </Menu>
      </Box>
    </div>
  );
}
