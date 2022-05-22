import { Box, Typography } from '@mui/material';
import React from 'react';
import TitleUserPage from '../../../../components/common/TitleUserPage/TitleUserPage';
import Categories from '../../components/Categories/Categories';
import ListProduct from '../../components/ListProduct/ListProduct';
import Slider from '../../components/Slider/Slider';
import Stores from '../../components/Stores/Stores';
import './homePage.scss';

export default function HomePage() {
  return (
    <div className="homePageWrapper">
      <Box className="homePageBanner">
        <Slider />
      </Box>

      <Box className="homePageCategory">
        <TitleUserPage title="Categories" link="/category/123" />
        <Categories />
      </Box>

      <Box className="homePageMainContentWrapper">
        <TitleUserPage title="Products" link="products" />
        <Box className="homePageMainContent">
          <Box className="homePageFilter">
            <h1>Filter</h1>
          </Box>
          <Box className="homePageProductsWrapper">
            <Box className="homePageProducts">
              <Typography className="titleCurve" component="h1" variant="h3">
                Near You
              </Typography>
              <ListProduct img="https://preview.ait-themes.club/citadela/fooddelivery/wp-content/uploads/sites/17/2020/11/ramen-600x450.jpg" />
            </Box>

            <Box className="homePageProducts">
              <Typography className="titleCurve" component="h1" variant="h3">
                The Hottest Food
              </Typography>
              <ListProduct img="https://preview.ait-themes.club/citadela/fooddelivery/wp-content/uploads/sites/17/2020/11/pork-belly-600x450.jpg" />
            </Box>

            <Box className="homePageProducts">
              <Typography className="titleCurve" component="h1" variant="h3">
                Đồ giải khát
              </Typography>
              <ListProduct img="https://preview.ait-themes.club/citadela/fooddelivery/wp-content/uploads/sites/17/2020/11/smoothies-768x576.jpg" />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className="homePageStores">
        <TitleUserPage title="Restaurants" link="/stores" />
        <Stores />
      </Box>
    </div>
  );
}
