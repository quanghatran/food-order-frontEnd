import SettingsIcon from '@mui/icons-material/Settings';
import { Backdrop, Box, Button, Divider, Fade, Modal, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import userApi from '../../../../api/userApi';
import TitleUserPage from '../../../../components/common/TitleUserPage/TitleUserPage';
import EditAccountForm from './EditAccountForm';
import './profile.scss';

const Profile = () => {
  const account = JSON.parse(localStorage.getItem('account'));
  const accountInfo = JSON.parse(localStorage.getItem('accountInfo'));
  const userUpdateInfo = JSON.parse(localStorage.getItem('userUpdateInfo'));

  const [isOpen, setIsOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [userUpdatedName, setUserUpdatedName] = useState(userUpdateInfo ? userUpdateInfo.name : '');

  const handleClose = () => {
    setIsOpen(false);
  };
  const handleOpen = () => {
    setIsOpen(true);
  };
  const initialValue = {
    name: userUpdatedName ? userUpdatedName : account.name,
    address: accountInfo.address,
  };
  const handleSubmitEditAccount = (value) => {
    (async () => {
      try {
        await userApi.patchUpdateUser(value);
        const responseUserInfo = await userApi.getUserInfo();
        setUserInfo(responseUserInfo);

        localStorage.setItem('accountInfo', JSON.stringify(responseUserInfo));
        localStorage.setItem('userUpdateInfo', JSON.stringify(value));
        setUserUpdatedName(value.name);
        toast.success('Update account success!');
      } catch (error) {
        console.log(error);
        toast.error('Update account failed!');
      }
    })();
    handleClose();
  };
  useEffect(() => {
    (async () => {
      try {
        const response = await userApi.getUserInfo();
        setUserInfo(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [userUpdatedName]);

  return (
    <Box className="Profile-container">
      <TitleUserPage title="Profle" link="#" />
      <Box className="Profile-btn">
        <Button variant="contained" endIcon={<SettingsIcon />} onClick={handleOpen}>
          Update Account
        </Button>
      </Box>
      <Box className="Profile-card">
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
          <Typography variant="p" className="profile-card-info--title">
            Basic Infomation
          </Typography>
          <Box style={{ margin: '40px auto' }}>
            <Divider style={{ width: '100%' }} />
          </Box>
          <Box className="profile-card-info--item">
            <Box className="profile-card-info--group">
              <Typography variant="p" className="accountInfo">
                <b>Name:</b> {userUpdatedName ? userUpdatedName : account.name}
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
      </Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen}>
          <Box className="myAccount-Edid-Modal">
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Edit Account
            </Typography>
            <Box id="transition-modal-description" sx={{ mt: 2 }}>
              <EditAccountForm
                isClose={handleClose}
                onSubmit={handleSubmitEditAccount}
                initialValue={initialValue}
              />
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};
export default Profile;
