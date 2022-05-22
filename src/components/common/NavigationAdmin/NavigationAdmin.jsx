import styled from '@emotion/styled';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import {
  AppBar,
  Badge,
  Box,
  Collapse,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  InputBase,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import menuIcon from '../../../assets/images/admin/menu.svg';
import { listAdminNavbar } from '../../../constants/admin';
import './navigationAdmin.scss';

const drawerWidth = 240;

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'rgba(229, 229, 229, 1)',
  '&:hover': {
    backgroundColor: 'rgba(229, 229, 229, 0.7)',
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function NavigationAdmin(props) {
  const { window } = props;
  const idAdminNavbar = localStorage.getItem('idAdminNavbar');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(idAdminNavbar || 1);
  const navigate = useNavigate();
  const [adminNavbar, setAdminNavbar] = useState(listAdminNavbar);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClickItem = (item, subItem) => {
    setSelectedIndex(item.id);
    navigate(item.link);
    localStorage.setItem('idAdminNavbar', item.id);
  };
  const drawer = (
    <div style={{ minHeight: '100vh', backgroundColor: '#3d464d' }}>
      <Toolbar className="welcomeAdminWrapper">
        <Link className="textDecorationNone" to="/admin">
          <Typography variant="h5" className="nameApp">
            Food Order
          </Typography>
        </Link>
        <p className="barge">
          <span>ADMIN</span>
        </p>
      </Toolbar>
      <Divider />
      <Box className="listMenuWrapper">
        <List>
          <List
            sx={{ width: '100%', maxWidth: 360 }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader
                style={{ backgroundColor: '#3d464d', color: '#C4C4C4' }}
                component="div"
                id="nested-list-subheader"
              >
                APPLICATION
              </ListSubheader>
            }
          >
            {adminNavbar &&
              selectedIndex &&
              adminNavbar.map((item) => (
                <div key={item.title}>
                  <ListItemButton
                    onClick={(e) => handleClickItem(item, item.subItem)}
                    selected={!item.subItem && selectedIndex === item.id}
                  >
                    <img style={{ paddingRight: '10px' }} src={item.icon} alt={item.name} />
                    <ListItemText primary={item.title} />
                    {item.subItem && (
                      <>{item.isOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowLeftIcon />}</>
                    )}
                  </ListItemButton>

                  {item.subItem && (
                    <Collapse in={item.isOpen} timeout="auto" unmountOnExit>
                      {item.subItem.map((subItem) => (
                        <List key={subItem.title} component="div" disablePadding>
                          <ListItemButton
                            sx={{ pl: 6 }}
                            onClick={(e) => handleClickItem(subItem, subItem.subItem)}
                            selected={selectedIndex === subItem.id}
                          >
                            <ListItemText primary={subItem.title} />
                          </ListItemButton>
                        </List>
                      ))}
                    </Collapse>
                  )}
                </div>
              ))}
          </List>
        </List>
      </Box>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        style={{ boxShadow: 'none' }}
        color="common"
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <img src={menuIcon} alt="menu" />
          </IconButton>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search" inputProps={{ 'aria-label': 'search' }} />
          </Search>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show new notifications" color="inherit">
              <Badge badgeContent={3} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Box className="leftAppBarAdminInfo">
              <img
                className="avatarAdmin"
                width="40"
                height="40"
                src="https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters/large/800/Baymax.Big-Hero-6.webp"
                alt="avatar_admin"
              />
              <span className="adminInfo">
                <div className="nameAdmin">Nam Nguyễn</div>
                <span className="roleInfo"> Admin</span>
              </span>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
        className="sideBarWrapper"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      ></Box>
    </Box>
  );
}
