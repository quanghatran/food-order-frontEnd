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
import { totalQuantity } from '../../userSlice';
import './productDetail.scss';

export default function ProductDetail() {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const [productDetail, setProductDetail] = useState(null);
  // const [productByStore, setProductByStore] = useState(null);
  const [productQuantity, setProductQuantity] = useState(1);
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

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    console.log(productDetail);
    if (cart) {
      const productExits = cart.find((item) => item.id === productDetail.id);
      if (productExits) {
        productExits.quantity += productQuantity;
        const NewCart = cart.filter((item) => item.id !== productDetail.id);
        NewCart.push(productExits);
        localStorage.setItem('cart', JSON.stringify(NewCart));
        const total = cart?.reduce((acc, curr) => (acc = acc + curr.quantity), 0);
        dispatch(totalQuantity(total));
      } else {
        const newItem = { ...productDetail, quantity: productQuantity };
        cart.push(newItem);
        localStorage.setItem('cart', JSON.stringify(cart));
        const total = cart?.reduce((acc, curr) => (acc = acc + curr.quantity), 0);
        dispatch(totalQuantity(total));
      }
    } else {
      const cartItem = { ...productDetail, quantity: productQuantity };
      localStorage.setItem('cart', JSON.stringify([cartItem]));
      dispatch(totalQuantity(productQuantity));
    }
  };

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
            <Box display="flex" alignItem="center">
              <Button
                variant="contained"
                color="secondary"
                sx={{ magin: 0 }}
                onClick={() => setProductQuantity((counter) => counter - 1)}
                disabled={productQuantity === 0 ? true : false}
              >
                -
              </Button>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                width="64px"
                height="36px"
                bgcolor="#a5ecd9"
              >
                <Typography variant="body2" fontSize="18px">
                  {productQuantity}
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="secondary"
                sx={{ magin: 0 }}
                onClick={() => setProductQuantity((counter) => counter + 1)}
              >
                +
              </Button>
            </Box>
            <Button
              className="productButtonAddCart"
              variant="contained"
              color="secondary"
              onClick={handleAddToCart}
              disabled={productQuantity === 0 ? true : false}
            >
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
