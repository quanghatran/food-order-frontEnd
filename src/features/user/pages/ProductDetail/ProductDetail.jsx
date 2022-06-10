import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import TitleUserPage from '../../../../components/common/TitleUserPage/TitleUserPage';
import { getProductDetail } from '../../../products/productSlice';
import './productDetail.scss';

export default function ProductDetail() {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const [productDetail, setProductDetail] = useState(null);

  // get product detail by id
  useEffect(() => {
    const fetchGetProductDetail = async () => {
      try {
        const result = await dispatch(getProductDetail(productId));

        unwrapResult(result);
        setProductDetail(result.payload.product[0]);
      } catch (error) {
        console.log('Get list product error: ', error);
      }
    };
    fetchGetProductDetail();
  }, [dispatch, productId]);

  console.log(productDetail);
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
            <Typography variant="h4">{productDetail.name}</Typography>
            <div className="divider"></div>
            <Typography variant="p">{productDetail.price}</Typography>
            <Typography variant="p">{productDetail.detail}</Typography>
            {/* <Typography variant="p">{productDetail.name}</Typography> */}
          </Box>
        </Box>
      )}
    </div>
  );
}
