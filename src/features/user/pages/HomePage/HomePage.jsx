import { Box, Grid, TextField, Typography } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import TitleUserPage from '../../../../components/common/TitleUserPage/TitleUserPage';
import { getListCategory } from '../../../categories/categoriesSlice';
import { getProductsByCategory, getTopProducts } from '../../../products/productSlice';
import { getAllStore } from '../../../storeManager/storeManagerSlice';
import Categories from '../../components/Categories/Categories';
import Product from '../../components/Product/Product';
import Slider from '../../components/Slider/Slider';
import Stores from '../../components/Stores/Stores';
import './homePage.scss';
import FilterListIcon from '@mui/icons-material/FilterList';
import productApi from '../../../../api/productApi';
import SearchDebouce from '../../../../components/common/SearchDebounce/SearchForm';
import ProductSearch from '../../components/ProductSearch/ProductSearch';

export default function HomePage() {
  const dispatch = useDispatch();

  const [listCategory, setListCategory] = useState(null);
  const [listStore, setListStore] = useState(null);
  const [topProducts, setTopProducts] = useState(null);
  // const [topProducts, setTopProducts] = useState(null);
  const [searchProducts, setSearchProducts] = useState('');
  const [nameCategory1, setNameCategory1] = useState('');
  const [listProductByCategory1, setListProductByCategory1] = useState(null);
  const [nameCategory2, setNameCategory2] = useState('');
  const [listProductByCategory2, setListProductByCategory2] = useState(null);
  const [nameCategory3, setNameCategory3] = useState('');
  const [listProductByCategory3, setListProductByCategory3] = useState(null);
  const [nameCategory4, setNameCategory4] = useState('');
  const [listProductByCategory4, setListProductByCategory4] = useState(null);

  // fetch get list category
  useEffect(() => {
    const fetchGetListCategory = async () => {
      try {
        const result = await dispatch(getListCategory());
        unwrapResult(result);
        const listCategory = result.payload.data;
        setListCategory(listCategory);

        if (listCategory) {
          const listProductByCategory1 = await dispatch(getProductsByCategory(listCategory[0].id));
          setNameCategory1(listCategory[0].name);
          setListProductByCategory1(listProductByCategory1.payload.data);

          const listProductByCategory2 = await dispatch(getProductsByCategory(listCategory[1].id));
          setNameCategory2(listCategory[1].name);
          setListProductByCategory2(listProductByCategory2.payload.data);

          const listProductByCategory3 = await dispatch(getProductsByCategory(listCategory[2].id));
          setNameCategory3(listCategory[2].name);
          setListProductByCategory3(listProductByCategory3.payload.data);

          const listProductByCategory4 = await dispatch(getProductsByCategory(listCategory[3].id));
          setNameCategory4(listCategory[3].name);
          setListProductByCategory4(listProductByCategory4.payload.data);
        }
      } catch (error) {
        console.log('Get list category error: ', error);
      }
    };

    fetchGetListCategory();
  }, [dispatch]);

  // fetch get list store
  useEffect(() => {
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
  }, [dispatch]);

  // fetch get list products by specific request
  useEffect(() => {
    const fetchGetTopProduct = async () => {
      try {
        // get list top product
        const resultTopProducts = await dispatch(getTopProducts({ limit: 8 }));
        unwrapResult(resultTopProducts);

        setTopProducts(resultTopProducts.payload.data);
      } catch (error) {
        console.log('Get list category error: ', error);
      }
    };

    fetchGetTopProduct();
  }, [dispatch]);

  const initialValue = {
    search: '',
  };
  const handleSubmitSearchForm = (FormValue) => {
    if (FormValue.searchTerm === '') return;
    (async () => {
      try {
        const response = await productApi.getProductByName(FormValue.searchTerm);
        setSearchProducts(response);
      } catch (error) {
        console.log(error);
      }
    })();
  };

  return (
    <div className="homePageWrapper">
      <Box className="homePageBanner">
        <Slider />
      </Box>
      <Box className="homePageCategory">
        <TitleUserPage title="Categories" link="/categories" />
        <Categories listCategory={listCategory} />
      </Box>

      <Box className="homePageMainContentWrapper">
        <TitleUserPage title="Products" link="products" />
        <Box className="homePageMainContent">
          <Box className="homePageFilter">
            <Box className="filterWrapper">
              <Box className="filterTitle">
                <Typography className="titleCurve" component="h1" variant="h3">
                  Filters
                </Typography>
                <FilterListIcon fontSize="medium" />
              </Box>
              <Box>
                <SearchDebouce
                  initialValue={initialValue}
                  onSubmit={handleSubmitSearchForm}
                  width="100%"
                />
              </Box>
            </Box>
          </Box>
          {searchProducts === '' ? (
            <Box className="homePageProductsWrapper">
              {listProductByCategory1 && (
                <Box>
                  <Typography className="titleCurve" component="h1" variant="h3">
                    {nameCategory1 ?? 'Category Name'}
                  </Typography>
                  <Grid container spacing={{ xs: 2, md: 4 }}>
                    {listProductByCategory1.map((productCategory, index) => (
                      <Grid key={index} item xs={12} md={6} lg={3}>
                        <Product style={{ marginBottom: '40px' }} data={productCategory.product} />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {listProductByCategory2 && (
                <Box>
                  <Typography className="titleCurve" component="h1" variant="h3">
                    {nameCategory2 ?? 'Category Name'}
                  </Typography>
                  <Grid container spacing={{ xs: 2, md: 4 }}>
                    {listProductByCategory2.map((productCategory, index) => (
                      <Grid key={index} item xs={12} md={6} lg={3}>
                        <Product style={{ marginBottom: '40px' }} data={productCategory.product} />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {listProductByCategory3 && (
                <Box>
                  <Typography className="titleCurve" component="h1" variant="h3">
                    {nameCategory3 ?? 'Category Name'}
                  </Typography>
                  <Grid container spacing={{ xs: 2, md: 4 }}>
                    {listProductByCategory3.map((productCategory, index) => (
                      <Grid key={index} item xs={12} md={6} lg={3}>
                        <Product style={{ marginBottom: '40px' }} data={productCategory.product} />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {listProductByCategory4 && (
                <Box>
                  <Typography className="titleCurve" component="h1" variant="h3">
                    {nameCategory4 ?? 'Category Name'}
                  </Typography>
                  <Grid container spacing={{ xs: 2, md: 4 }}>
                    {listProductByCategory4.map((productCategory, index) => (
                      <Grid key={index} item xs={12} md={6} lg={3}>
                        <Product style={{ marginBottom: '40px' }} data={productCategory.product} />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
            </Box>
          ) : (
            <Box className="homePageProductsWrapper">
              {searchProducts && (
                <Box>
                  <Typography className="titleCurve" component="h1" variant="h3">
                    Search Result
                  </Typography>
                  <Grid container spacing={{ xs: 2, md: 4 }}>
                    {searchProducts &&
                      searchProducts.map((product, index) => (
                        <Grid key={index} item xs={12} md={6} lg={3}>
                          <ProductSearch style={{ marginBottom: '40px' }} data={product} />
                        </Grid>
                      ))}
                  </Grid>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Box>
      <Box className="homePageStores">
        <TitleUserPage title="Restaurants" link="/stores" />
        <Stores listStore={listStore} />
      </Box>
    </div>
  );
}
