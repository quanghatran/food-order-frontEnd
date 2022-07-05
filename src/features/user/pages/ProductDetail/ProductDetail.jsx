import { Button, IconButton, Rating, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import TitleUserPage from '../../../../components/common/TitleUserPage/TitleUserPage';
import { getProductDetail, getProductsByStore } from '../../../products/productSlice';
import { getAllStore } from '../../../storeManager/storeManagerSlice';
import { totalQuantity } from '../../userSlice';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import './productDetail.scss';
import { toast } from 'react-toastify';
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import PopUpConfirm from '../../../../components/common/PopUpConfirm/PopUpConfirm';

export default function ProductDetail() {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const [productDetail, setProductDetail] = useState(null);
  const [productByStore, setProductByStore] = useState(null);
  const [productQuantity, setProductQuantity] = useState(1);
  const [storeInfo, setStoreInfo] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [productClickedId, setProductClickedId] = useState('');
  const [storeId, setStoreId] = useState('');

  const handleConfirmClose = () => {
    setIsConfirmOpen(false);
  };

  // get product detail by id
  useEffect(() => {
    const fetchGetProductDetail = async () => {
      try {
        const result = await dispatch(getProductDetail(productId));

        unwrapResult(result);
        setProductDetail(result.payload.product[0]);

        const storeId = result.payload.product[0].storeId;
        setStoreId(storeId);
        if (storeId) {
          // get own store information
          const resultListStore = await dispatch(getAllStore(storeId));
          unwrapResult(resultListStore);

          const listStore = resultListStore.payload;
          const foundStoreInfo = listStore.find((store) => store.id === storeId);
          setStoreInfo(foundStoreInfo);

          console.log(foundStoreInfo);

          if (foundStoreInfo) {
            const params = { q: foundStoreInfo.name };
            try {
              const resultListProductByStore = await dispatch(getProductsByStore(params));
              unwrapResult(resultListProductByStore);
              setProductByStore(resultListProductByStore.payload);
            } catch (error) {
              console.log(error);
            }
          }
        }
      } catch (error) {
        console.log('Get list product error: ', error);
      }
    };
    fetchGetProductDetail();
  }, [dispatch, productId]);

  const handleAddToCart = (productClickedId) => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    // const storeId = productDetail.storeId;
    setProductClickedId(productClickedId);

    if (cart) {
      const productExits = cart.find((item) => item.id === productDetail.id);

      if (productExits) {
        productExits.quantity += 1;
        const NewCart = cart.filter((item) => item.id !== productDetail.id);
        NewCart.push(productExits);
        localStorage.setItem('cart', JSON.stringify(NewCart));
        const total = cart?.reduce((acc, curr) => (acc = acc + curr.quantity), 0);
        dispatch(totalQuantity(total));
        toast.success('Update cart success!');
      } else {
        let productStoreId = localStorage.getItem('productStoreId');

        if (productDetail.storeId === productStoreId) {
          const newItem = { ...productDetail, quantity: 1 };
          cart.push(newItem);
          localStorage.setItem('cart', JSON.stringify(cart));
          const total = cart?.reduce((acc, curr) => (acc = acc + curr.quantity), 0);
          dispatch(totalQuantity(total));
          toast.success('Update cart success!');
        } else {
          setIsConfirmOpen(true);
        }
      }
    } else {
      localStorage.setItem('productStoreId', storeId);
      const cartItem = { ...productDetail, quantity: 1 };
      localStorage.setItem('cart', JSON.stringify([cartItem]));
      dispatch(totalQuantity(1));
      toast.success('Add product to cart success!');
    }
  };

  // delete current cart and create new cart
  const handleCreateNewCart = (productClickedId) => {
    const storeId = productDetail.storeId;
    setProductClickedId(productClickedId);
    const cartItem = { ...productDetail, quantity: 1 };

    localStorage.setItem('productStoreId', storeId);
    localStorage.setItem('cart', JSON.stringify([cartItem]));

    dispatch(totalQuantity(1));
    toast.success('Update cart success!');
    setIsConfirmOpen(false);
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
            <Rating name="read-only" defaultValue={4.5} precision={0.5} readOnly />

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
                />
                đ
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
            <Box display="flex" alignItem="center" style={{ marginTop: '10px' }}>
              <IconButton
                aria-label="delete"
                color="primary"
                onClick={() => setProductQuantity((counter) => counter - 1)}
                disabled={productQuantity === 0 ? true : false}
              >
                <RemoveIcon />
              </IconButton>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                width="64px"
                height="36px"
                bgcolor="#a5ecd9"
                borderRadius="10px"
                marginTop="5px"
              >
                <Typography variant="body2" fontSize="18px">
                  {productQuantity}
                </Typography>
              </Box>
              <IconButton
                aria-label="delete"
                color="primary"
                onClick={() => setProductQuantity((counter) => counter + 1)}
              >
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              className="productButtonAddCart"
              variant="contained"
              color="secondary"
              size="large"
              style={{ color: '#fff' }}
              onClick={handleAddToCart}
              disabled={productQuantity === 0 ? true : false}
            >
              Add to cart
            </Button>
          </Box>
        </Box>
      )}
      <Box className="relatedProductsWrapper">
        <TitleUserPage title="Other Products" link="/#" />
        <Box className="listRealatedProductWrapper">
          <ProductSlider
            productByStore={productByStore?.filter((product) => product.id !== productId)}
          />
        </Box>
      </Box>

      <PopUpConfirm
        dialogTitle="Start new cart?"
        dialogContent="Would you like to clear the current cart and add this item instead"
        isConfirmOpen={isConfirmOpen}
        handleConfirmClose={handleConfirmClose}
        onConfirmSubmit={() => handleCreateNewCart(productDetail.id)}
      />
    </div>
  );
}
