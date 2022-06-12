import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import TitleUserPage from '../../../../components/common/TitleUserPage/TitleUserPage';
import { getProductDetail } from '../../../products/productSlice';
import { getAllStore } from '../../../storeManager/storeManagerSlice';
import './productDetail.scss';

export default function ProductDetail() {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const [productDetail, setProductDetail] = useState(null);
  // const [productByStore, setProductByStore] = useState(null);
  const [storeInfo, setStoreInfo] = useState(null);

  // get product detail by id
  useEffect(() => {
    const fetchGetProductDetail = async () => {
      try {
        const result = await dispatch(getProductDetail(productId));

        unwrapResult(result);
        setProductDetail(result.payload.product[0]);

        const storeId = result.payload.product[0].storeId;
        console.log(storeId);

        if (storeId) {
          // // get products by store
          // const resultProductByStore = await dispatch(getProductsByStore(productId));
          // unwrapResult(resultProductByStore);
          // setProductByStore(resultProductByStore.payload);

          // get own store information
          const resultListStore = await dispatch(getAllStore(storeId));
          unwrapResult(resultListStore);
          // setListStore(resultListStore.payload);

          const listStore = resultListStore.payload;
          const foundStoreInfo = listStore.find((store) => store.id === storeId);
          setStoreInfo(foundStoreInfo);
        }
      } catch (error) {
        console.log('Get list product error: ', error);
      }
    };
    fetchGetProductDetail();
  }, [dispatch, productId]);

  console.log(storeInfo);
  return (
    <div className="productDetailWrapper">
      <Box className="homePageCategory">
        <TitleUserPage title="Product Detail" link="/#" />
      </Box>
      {productDetail && (
        <Box className="productContentWrapper">
          <Box className="productContentImage">
            <img src={productDetail.images[0]} alt="productImage" />
          </Box>
          <Box className="productContentInfo">
            <Typography className="titleCurve productName" component="h3" variant="h3">
              {productDetail.name}
            </Typography>

            <div className="divider"></div>
            <Typography className="productInfoDetail" variant="p">
              <b>Description:</b> {productDetail.description}
            </Typography>
            <Box className="numbBoughtAndPrice">
              <Typography className="productInfoDetail" variant="p">
                <b>Price:</b>{' '}
                <CurrencyFormat
                  value={productDetail.price}
                  displayType={'text'}
                  thousandSeparator={true}
                />{' '}
                VNĐ
              </Typography>
              <Typography className="productInfoDetail" variant="p">
                <b>Bought:</b> {productDetail.boughtNum}
              </Typography>
            </Box>
            {storeInfo && (
              <Box className="numbBoughtAndPrice">
                <Typography className="productInfoDetail" variant="p">
                  <b>Restaurant:</b> {storeInfo.name}
                </Typography>
                <Typography className="productInfoDetail" variant="p">
                  <b>Address:</b> {storeInfo.address}
                </Typography>
              </Box>
            )}
            <Button className="productButtonAddCart" variant="contained" color="secondary">
              Add to cart
            </Button>
          </Box>
        </Box>
      )}
      <Box className="relatedProductsWrapper">
        <TitleUserPage title="Related Products" link="/#" />
        <Box className="listRealatedProductWrapper">
          <p>show list related product by category</p>
        </Box>
      </Box>
    </div>
  );
}
