import StorefrontIcon from '@mui/icons-material/Storefront';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import StorageIcon from '@mui/icons-material/Storage';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import React from 'react';

export const listAdminNavbar = [
  { id: 1, title: 'DashBoard', icon: <DashboardIcon />, link: '/admin/' },
  {
    id: 2,
    title: 'Stores',
    icon: <StorefrontIcon />,
    link: '/admin/stores',
    isOpen: true,

    // subItem: [
    //   { id: 3, title: 'List Store', link: '/admin/stores' },
    //   { id: 4, title: 'Add Store', link: '/admin/store/add' },
    // ],
  },
  {
    id: 5,
    title: 'Users',
    icon: <PersonOutlinedIcon />,
    link: '/admin/user',
    isOpen: true,
  },
  {
    id: 8,
    title: 'Orders',
    icon: <ShoppingCartOutlinedIcon />,
    link: '/admin/orders',
  },
  {
    id: 9,
    title: 'Products',
    icon: <StorageIcon />,
    link: '/admin/products',
    isOpen: true,
    // subItem: [
    //   { id: 10, title: 'List Product', link: '/admin/products' },
    //   { id: 11, title: 'Add Product', link: '/admin/product/add' },
    // ],
  },
  {
    id: 12,
    title: 'Categories',
    icon: <CategoryOutlinedIcon />,
    link: '/admin/category',
  },
  {
    id: 13,
    title: 'Information',
    icon: <SettingsIcon />,
    link: '/admin/info',
  },
  {
    id: 15,
    title: 'Logout',
    icon: <LogoutIcon />,
    link: '#',
  },
];
