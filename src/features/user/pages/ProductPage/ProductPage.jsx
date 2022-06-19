import { Box, Grid, Pagination, TextField } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import productApi from '../../../../api/productApi';
import SearchDebouce from '../../../../components/common/SearchDebounce/SearchForm';
import TitleUserPage from '../../../../components/common/TitleUserPage/TitleUserPage';
import { getListProduct } from '../../../products/productSlice';
import Product from '../../components/Product/Product';
import ProductSearch from '../../components/ProductSearch/ProductSearch';
import './productPage.scss';

export default function ProductPage() {
  const dispatch = useDispatch();

  const [listProduct, setListProduct] = useState(null);
  const [params, setParams] = useState({ page: 1, perPage: 12 });
  const [totalUser, setTotalUser] = useState(0);
  const [searchProducts, setSearchProducts] = useState(null);

  // get all products in system
  useEffect(() => {
    const fetchGetListProduct = async () => {
      try {
        const result = await dispatch(getListProduct(params));
        unwrapResult(result);
        setTotalUser(result.payload.count);
        setListProduct(result.payload.data);
      } catch (error) {
        console.log('Get list product error: ', error);
      }
    };
    fetchGetListProduct();
  }, [params]);

  const handlePaginationChange = (event, value) => {
    setParams({ ...params, page: value });
  };

  const initialValue = {
    search: '',
  };

  const handleSubmitSearchForm = (FormValue) => {
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
    <div className="productPageWrapper">
      <Box
        className="homePageCategory"
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: '10px',
        }}
      >
        <TitleUserPage title="Products" link="#" />
        <Box className="searchWrapper">
          <SearchDebouce
            initialValue={initialValue}
            onSubmit={handleSubmitSearchForm}
            width="400px"
          />
        </Box>
      </Box>
      <TextField
        style={{ width: '400px', marginBottom: '40px' }}
        id="filled-hidden-label-small"
        placeholder="Search by name"
        variant="outlined"
        size="large"
      />

      <Box className="listProductContainer">
        <Box sx={{ flexGrow: 1 }}>
          {searchProducts === null ? (
            <Grid container spacing={{ xs: 3, md: 6 }}>
              {listProduct &&
                listProduct.map((product) => (
                  <Grid key={product.id} item xs={12} md={6} lg={3}>
                    <Product
                      style={{ marginBottom: '40px' }}
                      data={product}
                      // img={img}
                    />
                  </Grid>
                ))}
            </Grid>
          ) : (
            <Grid container spacing={{ xs: 3, md: 6 }}>
              {searchProducts &&
                searchProducts.map((product) => (
                  <Grid key={product.id} item xs={12} md={6} lg={3}>
                    <ProductSearch
                      style={{ marginBottom: '40px' }}
                      data={product}
                      // img={img}
                    />
                  </Grid>
                ))}
            </Grid>
          )}
        </Box>
      </Box>
      <Box className="paginationBox">
        <Pagination
          style={{ marginTop: '50px' }}
          size="large"
          count={Math.ceil(totalUser / params.perPage)}
          shape="rounded"
          color="primary"
          onChange={handlePaginationChange}
        />
      </Box>
    </div>
  );
}
