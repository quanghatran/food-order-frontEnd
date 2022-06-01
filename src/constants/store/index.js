import StorefrontIcon from '@mui/icons-material/Storefront';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import StorageIcon from '@mui/icons-material/Storage';
import LogoutIcon from '@mui/icons-material/Logout';
import LoyaltyIcon from '@mui/icons-material/Loyalty';

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
    title: 'Sale Code',
    icon: <LoyaltyIcon />,
    link: '/store/sale-codes',
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
    id: 9,
    title: 'Products',
    icon: <StorageIcon />,
    link: '/store/products',
    isOpen: true,
  },
  {
    id: 12,
    title: 'Categories',
    icon: <CategoryOutlinedIcon />,
    link: '/store/category',
  },
  {
    id: 15,
    title: 'Logout',
    icon: <LogoutIcon />,
    link: '#',
  },
];
