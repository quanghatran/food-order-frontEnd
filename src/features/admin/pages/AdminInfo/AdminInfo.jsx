import CheckCircleOutlineSharpIcon from '@mui/icons-material/CheckCircleOutlineSharp';
import DoNotDisturbAltTwoToneIcon from '@mui/icons-material/DoNotDisturbAltTwoTone';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Button, Divider, Paper, Rating, Typography } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import TitleAdminStorePage from '../../../../components/common/TitleAdminStorePage/TitleAdminStorePage';
import '../../../store/pages/Info/info.scss';
import { getAdminInfo } from '../../../user/userSlice';

export default function AdminInfo() {
  const dispatch = useDispatch();

  const [adminInfo, setAdminInfo] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const account = JSON.parse(localStorage.getItem('account'));

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  // get admin info
  useEffect(() => {
    const fetchGetAdminInfo = async () => {
      try {
        const result = await dispatch(getAdminInfo());
        unwrapResult(result);

        setAdminInfo(result.payload[0]);
      } catch (error) {
        console.log('Get list sale code error: ', error);
      }
    };
    fetchGetAdminInfo();
  }, []);

  // const handleFormSubmit = (dataSubmit) => {
  //   console.log(dataSubmit);
  // };

  return (
    <div className="storeInfoWrapper">
      <Box className="headerStoreInfo">
        <TitleAdminStorePage title="Store Information" />
        <Button
          variant="contained"
          endIcon={<SettingsIcon />}
          // onClick={handleOpen}
        >
          Update Account
        </Button>
      </Box>
      {adminInfo && (
        <Paper className="storeInfoContent">
          <img
            className="storeAvatar"
            src={
              adminInfo.image
                ? adminInfo.image
                : 'https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters/large/800/Baymax.Big-Hero-6.webp'
            }
            alt="store_avatar"
          />
          <Box className="contentWrapper">
            <TitleAdminStorePage styleTitle={{ fontSize: '23px' }} title="Basic Information" />
            <Box className="basicInfo">
              <Box className="divideContent">
                <Typography variant="p">
                  <b>Name:</b> {adminInfo.name}
                </Typography>
                <Typography className="storeInfo" variant="p">
                  <b>Role:</b> {adminInfo.role}
                </Typography>
              </Box>
              <Box className="divideContent">
                <Typography className="storeInfo" variant="p">
                  <b>Email:</b> {adminInfo.email}
                </Typography>
                <Typography className="storeInfo" variant="p">
                  <b>Phone number:</b> {adminInfo.phoneNumber}
                </Typography>
              </Box>
            </Box>
            <Divider style={{ margin: '30px auto' }} />
            <TitleAdminStorePage styleTitle={{ fontSize: '23px' }} title="Extra Information" />
            <Box>
              <Typography variant="p">
                <b>Address:</b> {adminInfo.address}
              </Typography>
              <Typography className="storeInfo" variant="p">
                <b>Is Verify Email:</b> {adminInfo.isVerify === true ? 'Verified' : 'Not Verified'}
              </Typography>
            </Box>
          </Box>
        </Paper>
      )}
      {/* <UpdateStore isOpen={isOpen} handleClose={handleClose} onFormSubmit={handleFormSubmit} /> */}
    </div>
  );
}
