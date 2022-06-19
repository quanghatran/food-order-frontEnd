import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllStore } from '../../../storeManager/storeManagerSlice';
import './restaurantPage.scss';
import { Box, Grid, TextField, Typography } from '@mui/material';
import TitleUserPage from '../../../../components/common/TitleUserPage/TitleUserPage';
import Stores from '../../components/Stores/Stores';

export default function RestaurantPage() {
  const dispatch = useDispatch();

  const [listStore, setListStore] = useState(null);

  // get list store information
  useEffect(() => {
    const fetchGetListStore = async () => {
      try {
        const result = await dispatch(getAllStore());
        unwrapResult(result);

        setListStore(result.payload);
      } catch (error) {
        console.log('Get list product error: ', error);
      }
    };
    fetchGetListStore();
  }, [dispatch]);

  return (
    <div className="restaurantPageWrapper categoriesWrapper">
      <Box
        className="homePageCategory"
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: '10px',
        }}
      >
        <TitleUserPage title="Restaurants" link="#" />
      </Box>
      {/* <TextField
        style={{ width: '400px', marginBottom: '40px' }}
        id="filled-hidden-label-small"
        placeholder="Search by restaurant"
        variant="outlined"
        size="large"
      /> */}
      <Stores listStore={listStore} />
    </div>
  );
}
