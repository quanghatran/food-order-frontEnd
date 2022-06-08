import { Box, Grid, Typography } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListCategory, searchProductByCategory } from '../../../categories/categoriesSlice';
import '../../components/Categories/categories.scss';
import ListProduct from '../../components/ListProduct/ListProduct';
import '../HomePage/homePage.scss';
import './category.scss';
import React from 'react';
import TitleUserPage from '../../../../components/common/TitleUserPage/TitleUserPage';

export default function Category() {
  const dispatch = useDispatch();
  const categoryName = useSelector((state) => state.categories.categoryName);

  const [listCategory, setListCategory] = useState(null);
  const [categoryID, setCategoryID] = useState(categoryName ? categoryName : '');

  useEffect(() => {
    const fetchGetListCategory = async () => {
      try {
        const listCategory = await dispatch(getListCategory());
        unwrapResult(listCategory);

        setListCategory(listCategory.payload.data);
      } catch (error) {
        console.log('Get list category error: ', error);
      }
    };
    fetchGetListCategory();
  }, [categoryID]);

  const handleChangeCategory = (category) => {
    dispatch(searchProductByCategory(category));
    setCategoryID(category);
  };

  // TODO: fetch list product by categoried that selected

  return (
    <div className="categoryWrapper homePageWrapper categoriesWrapper">
      <Box className="homePageCategory">
        <TitleUserPage title="Categories" link="/#" />
      </Box>
      <Box className="homePageMainContentWrapper">
        <Box className="homePageMainContent">
          <Box className="homePageFilter">
            <Typography className="titleCurve" component="h1" variant="h3">
              Categories
            </Typography>
            {listCategory && (
              <Box sx={{ flexGrow: 1 }}>
                <Grid className="listCategory" container spacing={{ xs: 2 }}>
                  {listCategory.map((category) => (
                    <Grid className="categoryItem" item xs={6} key={category.id}>
                      <Box
                        className={`categoryBox ${categoryID === category.name ? 'active' : ''}`}
                        onClick={(e) => handleChangeCategory(category.name)}
                      >
                        <img
                          width="60"
                          height="60"
                          className="categoryCard"
                          src={category.image}
                          alt="category"
                        />
                        <div className="categoryBoxOverlay">
                          <h1 style={{ fontSize: '1.15em' }}>{category.name}</h1>
                        </div>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </Box>

          <Box className="homePageProductsWrapper">
            {/* <Box className="homePageProducts">
              <Typography className="titleCurve" component="h1" variant="h3">
                Noodle
              </Typography>
              <ListProduct img="https://preview.ait-themes.club/citadela/fooddelivery/wp-content/uploads/sites/17/2020/11/ramen-600x450.jpg" />
              <br />
              <ListProduct img="https://preview.ait-themes.club/citadela/fooddelivery/wp-content/uploads/sites/17/2020/11/ramen-600x450.jpg" />
              <br />
              <ListProduct img="https://preview.ait-themes.club/citadela/fooddelivery/wp-content/uploads/sites/17/2020/11/ramen-600x450.jpg" />
            </Box> */}
          </Box>
        </Box>
      </Box>
    </div>
  );
}
