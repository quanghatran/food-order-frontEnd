import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Button, Divider, Paper, Rating, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import TitleAdminStorePage from '../../../../components/common/TitleAdminStorePage/TitleAdminStorePage';
import './info.scss';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { getStoreInfo } from '../../storeSlice.js';
import CheckCircleOutlineSharpIcon from '@mui/icons-material/CheckCircleOutlineSharp';
import DoNotDisturbAltTwoToneIcon from '@mui/icons-material/DoNotDisturbAltTwoTone';
import UpdateStore from '../../components/UpdateStore';

export default function Info() {
  const dispatch = useDispatch();

  const [storeInfo, setStoreInfo] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const account = JSON.parse(localStorage.getItem('account'));

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  // get store info
  useEffect(() => {
    const fetchGetStoreInfo = async () => {
      try {
        const result = await dispatch(getStoreInfo());
        unwrapResult(result);
        setStoreInfo(result.payload);
      } catch (error) {
        console.log('Get list sale code error: ', error);
      }
    };
    fetchGetStoreInfo();
  }, []);

  const handleFormSubmit = (dataSubmit) => {
    console.log(dataSubmit);
  };

  return (
    <div className="storeInfoWrapper">
      <Box className="headerStoreInfo">
        <TitleAdminStorePage title="Store Information" />
        <Button variant="contained" endIcon={<SettingsIcon />} onClick={handleOpen}>
          Update Account
        </Button>
      </Box>
      {storeInfo && (
        <Paper className="storeInfoContent">
          <img
            className="storeAvatar"
            src={
              storeInfo.image
                ? storeInfo.image
                : 'https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters/large/800/Baymax.Big-Hero-6.webp'
            }
            alt="store_avatar"
          />
          <Box className="contentWrapper">
            <TitleAdminStorePage styleTitle={{ fontSize: '23px' }} title="Basic Information" />
            <Box className="basicInfo">
              <Box className="divideContent">
                <Typography variant="p">
                  <b>Name:</b> {storeInfo.name}
                </Typography>
                <Typography className="storeInfo" variant="p">
                  <b>Role:</b> {account.role}
                </Typography>
              </Box>
              <Box className="divideContent">
                <Typography className="storeInfo" variant="p">
                  <b>Email:</b> {storeInfo.email}
                </Typography>
                <Typography className="storeInfo" variant="p">
                  <b>Phone number:</b> {storeInfo.phoneNumber}
                </Typography>
              </Box>
            </Box>
            <Divider style={{ margin: '30px auto' }} />
            <TitleAdminStorePage styleTitle={{ fontSize: '23px' }} title="Extra Information" />
            <Box className="advanceInfo">
              <Box className="divideContent">
                <Typography variant="p">
                  <b>Address:</b> {storeInfo.address}
                </Typography>
                <Typography className="storeInfo" variant="p">
                  <b>Time Open:</b> {storeInfo.timeOpen || 'Not Available'}
                </Typography>
                <Typography className="storeInfo" variant="p">
                  <b>Time Close:</b> {storeInfo.timeOpen || 'Not Available'}
                </Typography>
              </Box>
              <Box className="divideContent">
                <Typography variant="p">
                  <b>Status:</b>{' '}
                  {storeInfo.status === 'active' ? (
                    <span>
                      {storeInfo.status}{' '}
                      <CheckCircleOutlineSharpIcon fontSize="small" color="success" />
                    </span>
                  ) : (
                    <span>
                      {storeInfo.status} <DoNotDisturbAltTwoToneIcon color="error" />
                    </span>
                  )}
                </Typography>
                <Typography className="storeInfo" variant="p">
                  <b>Is Verify Email:</b>{' '}
                  {storeInfo.isVerify === true ? 'Verified' : 'Not Verified'}
                </Typography>
                <Typography className="storeInfo" variant="p">
                  <b>Stars:</b>{' '}
                  <Rating
                    size="small"
                    name="half-rating-read"
                    defaultValue={storeInfo.star}
                    precision={0.5}
                    readOnly
                  />
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>
      )}
      <UpdateStore isOpen={isOpen} handleClose={handleClose} onFormSubmit={handleFormSubmit} />
    </div>
  );
}
