import { Box, Grid, Typography } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TitleUserPage from '../../../../components/common/TitleUserPage/TitleUserPage';
import { getListCategory, searchProductByCategory } from '../../../categories/categoriesSlice';
import { getProductsByCategory } from '../../../products/productSlice';
import '../../components/Categories/categories.scss';
import Product from '../../components/Product/Product';
import '../HomePage/homePage.scss';
import './category.scss';

export default function Category() {
  const dispatch = useDispatch();
  const categoryName = useSelector((state) => state.categories.categoryName);

  const [listCategory, setListCategory] = useState(null);
  const [categoryID, setCategoryID] = useState(categoryName ? categoryName : 'Coffee');
  const [listProductByCategory, setListProductByCategory] = useState(null);
  const [categorySelected, setNameCategorySelected] = useState();

  useEffect(() => {
    const fetchGetListCategory = async () => {
      try {
        const listCategory = await dispatch(getListCategory());
        unwrapResult(listCategory);

        setListCategory(listCategory.payload.data);

        // TODO: fetch list product by categoried that selected
        if (categorySelected) {
          try {
            const listProductByCategory = await dispatch(getProductsByCategory(categorySelected));
            unwrapResult(listProductByCategory);

            setListProductByCategory(listProductByCategory.payload.data);
          } catch (error) {
            console.log('Get list product by categoriy failed: ', error);
          }
        }
      } catch (error) {
        console.log('Get list category error: ', error);
      }
    };
    fetchGetListCategory();
  }, [categoryID, categorySelected]);

  const handleChangeCategory = (categoryName, categoryId) => {
    dispatch(searchProductByCategory(categoryName));
    setCategoryID(categoryName);
    setNameCategorySelected(categoryId);
  };

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
                        onClick={(e) => handleChangeCategory(category.name, category.id)}
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
            {listProductByCategory && (
              <Box>
                <Typography className="titleCurve" component="h1" variant="h3">
                  {categoryID ?? 'Category Name'}
                </Typography>
                {/* <p className="titleProductByCategories">{categoryID ?? 'Category Name'}</p> */}
                <Grid container spacing={{ xs: 2, md: 4 }}>
                  {listProductByCategory.map((productCategory) => (
                    <Grid key={productCategory.productId} item xs={12} md={6} lg={3}>
                      <Product style={{ marginBottom: '40px' }} data={productCategory.product} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </div>
  );
}
