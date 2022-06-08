import { Box, Grid, Pagination, TextField } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import TitleUserPage from '../../../../components/common/TitleUserPage/TitleUserPage';
import { getListProduct } from '../../../products/productSlice';
import Product from '../../components/Product/Product';
import './productPage.scss';

export default function ProductPage() {
  const dispatch = useDispatch();

  const [listProduct, setListProduct] = useState(null);
  const [params, setParams] = useState({ page: 1, perPage: 12 });
  const [totalUser, setTotalUser] = useState(0);

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

  return (
    <div className="productPageWrapper">
      <Box
        className="homePageCategory"
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: '30px',
        }}
      >
        <TitleUserPage title="Products" link="#" />
        <TextField
          style={{ width: '400px' }}
          id="filled-hidden-label-small"
          placeholder="Search by name"
          variant="outlined"
          size="large"
        />
      </Box>

      <Box className="listProductContainer">
        <Box sx={{ flexGrow: 1 }}>
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
