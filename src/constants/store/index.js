import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import SettingsIcon from '@mui/icons-material/Settings';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import StorageIcon from '@mui/icons-material/Storage';
import React from 'react';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

export const listStoreNavbar = [
  { id: 1, title: 'DashBoard', icon: <DashboardIcon />, link: '/store/' },
  {
    id: 2,
    title: 'Orders',
    icon: <ShoppingCartOutlinedIcon />,
    link: '/store/orders',
  },
  {
    id: 3,
    title: 'Sale Codes',
    icon: <LoyaltyIcon />,
    link: '/store/sale-codes',
    // isOpen: true,
    // subItem: [
    //   { id: 45, title: 'List Sale Code', link: '/store/sale-codes' },
    //   { id: 46, title: 'Add Sale Code', link: '/store/sale-codes/add' },
    // ],
  },
  // {
  //   id: 4,
  //   title: 'Stores',
  //   icon: <StorefrontIcon />,
  //   link: '/admin/stores',
  //   isOpen: true,

  //   subItem: [
  //     { id: 3, title: 'List Store', link: '/admin/stores' },
  //     { id: 4, title: 'Add Store', link: '/admin/store/add' },
  //   ],
  // },
  // {
  //   id: 5,
  //   title: 'Users',
  //   icon: <PersonOutlinedIcon />,
  //   link: '/admin/users',
  //   isOpen: true,
  //   subItem: [
  //     { id: 6, title: 'List User', link: '/admin/users' },
  //     { id: 7, title: 'Add User', link: '/admin/user/add' },
  //   ],
  // },
  {
    id: 34,
    title: 'Products',
    icon: <StorageIcon />,
    link: '/store/products',
    isOpen: true,
    subItem: [
      { id: 34, title: 'List Product', link: '/store/products' },
      { id: 35, title: 'Add Product', link: '/store/products/add' },
    ],
  },
  // {
  //   id: 89,
  //   title: 'Monthly Fee',
  //   icon: <CurrencyExchangeIcon />,
  //   link: '/store/monthly-fee',
  // },
  // {
  //   id: 12,
  //   title: 'Categories',
  //   icon: <CategoryOutlinedIcon />,
  //   link: '/store/category',
  // },
  {
    id: 5,
    title: 'Account',
    icon: <SettingsIcon />,
    link: '/store/info',
    isOpen: true,
  },
  {
    id: 15,
    title: 'Logout',
    icon: <LogoutIcon />,
    link: '#',
  },
];
