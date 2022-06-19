import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Button, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import './profile.scss';
const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const account = JSON.parse(localStorage.getItem('account'));
  const accountInfo = JSON.parse(localStorage.getItem('accountInfo'));
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleOpen = () => {
    setIsOpen(true);
  };
  return (
    <Box className="Profile-container">
      <Box className="Profile-btn">
        <Button variant="contained" endIcon={<SettingsIcon />} onClick={handleOpen}>
          Update Account
        </Button>
      </Box>
      <Paper className="Profile-card">
        <Box className="Profile-card-img">
          <img
            className=""
            src={
              accountInfo.avatar
                ? accountInfo.avatar
                : 'https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters/large/800/Baymax.Big-Hero-6.webp'
            }
            alt="user_avatar"
          />
        </Box>
        <Box className="profile-card-info">
          <Typography variant="h3" className="profile-card-info--title">
            Basic Infomation
          </Typography>
          <Box className="profile-card-info--item">
            <Box className="profile-card-info--group">
              <Typography variant="p" className="accountInfo">
                <b>Name:</b> {account.name}
              </Typography>
              <Typography className="accountInfo" variant="p">
                <b>Role:</b> {account.role}
              </Typography>
              <Typography className="accountInfo" variant="p">
                <b>Email:</b> {accountInfo.email}
              </Typography>
            </Box>
            <Box className="profile-card-info--group">
              <Typography className="accountInfo" variant="p">
                <b>Phone number:</b> {accountInfo.phoneNumber}
              </Typography>
              <Typography className="accountInfo" variant="p">
                <b>Address:</b> {accountInfo.address}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
export default Profile;
