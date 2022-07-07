import { Box, Grid, Typography } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TitleUserPage from '../../../../components/common/TitleUserPage/TitleUserPage';
import { getListCategory, searchProductByCategory } from '../../../categories/categoriesSlice';
import { getProductsByCategory } from '../../../products/productSlice';
import { getAllStore } from '../../../storeManager/storeManagerSlice';
import '../../components/Categories/categories.scss';
import Product from '../../components/Product/Product';
import '../HomePage/homePage.scss';
import './category.scss';

export default function Category() {
  const dispatch = useDispatch();

  const reduxCategoryName = useSelector((state) => state.categories.categoryName);

  console.log(reduxCategoryName);

  const [listCategory, setListCategory] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [listProductByCategory, setListProductByCategory] = useState(null);
  const [categorySelected, setNameCategorySelected] = useState();
  const [listStore, setListStore] = useState(null);

  useEffect(() => {
    const fetchGetListCategory = async () => {
      try {
        const listCategory = await dispatch(getListCategory());
        unwrapResult(listCategory);

        setListCategory(listCategory.payload.data);
        if (reduxCategoryName) {
          console.log(1);
          const reduxCategoryData = listCategory.payload.data.find(
            (category) => category.name === reduxCategoryName
          );
          setCategoryName(reduxCategoryName);

          // fetch get list initial products by initial category
          try {
            const listProductByCategory = await dispatch(
              getProductsByCategory(reduxCategoryData.id)
            );
            unwrapResult(listProductByCategory);

            setListProductByCategory(listProductByCategory.payload.data);
          } catch (error) {
            console.log('Get list product by categoriy failed: ', error);
          }
        } else if (!reduxCategoryName && listCategory.payload.data) {
          setCategoryName(listCategory.payload.data[0].name);

          // fetch get list initial products by initial category
          try {
            const listProductByCategory = await dispatch(
              getProductsByCategory(listCategory.payload.data[0].id)
            );
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

    // fetch get list store
    const fetchGetListStore = async () => {
      try {
        const listStore = await dispatch(getAllStore());
        unwrapResult(listStore);

        setListStore(listStore.payload);
      } catch (error) {
        console.log('Get list store error: ', error);
      }
    };

    fetchGetListStore();
    fetchGetListCategory();
  }, [reduxCategoryName, dispatch]);

  console.log(listStore);
  // fetch list product by categoried that selected
  useEffect(() => {
    const fetchGetListProduct = async () => {
      // fetch list product by categoried that selected
      if (categorySelected) {
        try {
          const listProductByCategory = await dispatch(getProductsByCategory(categorySelected));
          unwrapResult(listProductByCategory);

          setListProductByCategory(listProductByCategory.payload.data);
        } catch (error) {
          console.log('Get list product by categoriy failed: ', error);
        }
      }
    };
    fetchGetListProduct();
  }, [categoryName, categorySelected, dispatch]);

  const handleChangeCategory = (categoryName, categoryId) => {
    dispatch(searchProductByCategory(categoryName));
    setCategoryName(categoryName);
    setNameCategorySelected(categoryId);
  };

  const findStoreInfo = (idStore) => {
    if (listStore) {
      const storeInfo = listStore.find((store) => store.id === idStore);
      return storeInfo;
    }
  };

  console.log(listProductByCategory);

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
                        className={`categoryBox ${categoryName === category.name ? 'active' : ''}`}
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
                  {categoryName ?? 'Category Name'}
                </Typography>
                {/* <p className="titleProductByCategories">{categoryID ?? 'Category Name'}</p> */}
                <Grid container spacing={{ xs: 2, md: 4 }}>
                  {listProductByCategory.map((productCategory) => (
                    <Grid key={productCategory.productId} item xs={12} md={6} lg={3}>
                      <Product
                        style={{ marginBottom: '40px' }}
                        data={productCategory.product}
                        storeInfo={findStoreInfo(productCategory.product.storeId)}
                      />
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
