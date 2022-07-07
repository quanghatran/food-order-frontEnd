import { Box, Grid, Pagination } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import productApi from '../../../../api/productApi';
import SearchDebouce from '../../../../components/common/SearchDebounce/SearchForm';
import TitleUserPage from '../../../../components/common/TitleUserPage/TitleUserPage';
import { getListProduct } from '../../../products/productSlice';
import { getAllStore } from '../../../storeManager/storeManagerSlice';
import Product from '../../components/Product/Product';
import './productPage.scss';

export default function ProductPage() {
  const dispatch = useDispatch();

  const [listProduct, setListProduct] = useState(null);
  const [params, setParams] = useState({ page: 1, perPage: 8 });
  const [totalUser, setTotalUser] = useState(0);
  const [searchProducts, setSearchProducts] = useState(null);
  const [listStore, setListStore] = useState(null);

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
    fetchGetListProduct();
  }, [params, dispatch]);

  const handlePaginationChange = (event, value) => {
    setParams({ ...params, page: value });
  };

  const initialValue = {
    search: '',
  };

  const findStoreInfo = (idStore) => {
    if (listStore) {
      console.log(idStore);
      const storeInfo = listStore.find((store) => store.id === idStore);
      return storeInfo;
    }
  };

  const handleSubmitSearchForm = (FormValue) => {
    (async () => {
      try {
        const response = await productApi.getProductByName(FormValue.searchTerm);

        if (response) {
          Object.keys(response).forEach(function (key) {
            response[key].boughtNum = response[key].Product_bought_num;
            response[key].description = response[key].Product_description;
            response[key].id = response[key].Product_id;
            response[key].images = response[key].Product_images;
            response[key].name = response[key].Product_name;
            response[key].price = response[key].Product_price;
            response[key].store = findStoreInfo(response[key].Product_storeId);

            delete response[key].Product_bought_num;
            delete response[key].Product_description;
            delete response[key].Product_id;
            delete response[key].Product_images;
            delete response[key].Product_name;
            delete response[key].Product_price;
            delete response[key].Product_storeId;
            delete response[key].Product_created_at;
            delete response[key].Product_status;
            delete response[key].Product_updated_at;
          });
          setSearchProducts(response);
        }
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
      </Box>
      <Box className="searchWrapper" style={{ width: '400px', marginBottom: '40px' }}>
        <SearchDebouce
          initialValue={initialValue}
          onSubmit={handleSubmitSearchForm}
          width="400px"
        />
      </Box>
      {/* <TextField
       
        id="filled-hidden-label-small"
        placeholder="Search by name"
        variant="outlined"
        size="large"
      /> */}

      <Box className="listProductContainer">
        <Box sx={{ flexGrow: 1 }}>
          {searchProducts === null ? (
            <Grid container spacing={{ xs: 2, md: 4 }}>
              {listProduct &&
                listProduct.map((product) => (
                  <Grid key={product.id} item xs={12} md={6} lg={3}>
                    <Product
                      style={{ marginBottom: '40px' }}
                      data={product}
                      storeInfo={findStoreInfo(product.storeId)}
                    />
                  </Grid>
                ))}
            </Grid>
          ) : (
            <Grid container spacing={{ xs: 2, md: 4 }}>
              {searchProducts &&
                searchProducts.map((product) => (
                  <Grid key={product.id} item xs={12} md={6} lg={3}>
                    <Product
                      style={{ marginBottom: '40px' }}
                      data={product}
                      storeInfo={product.store}
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
