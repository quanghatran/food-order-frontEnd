import CheckCircleOutlineSharpIcon from '@mui/icons-material/CheckCircleOutlineSharp';
import DoNotDisturbAltTwoToneIcon from '@mui/icons-material/DoNotDisturbAltTwoTone';
import { Box, Divider, Grid, Rating, Typography } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import TitleAdminStorePage from '../../../../components/common/TitleAdminStorePage/TitleAdminStorePage';
import TitleUserPage from '../../../../components/common/TitleUserPage/TitleUserPage';
import { getProductsByStore } from '../../../products/productSlice';
import { getListSaleCodeById } from '../../../saleCode/saleCodeSlice';
import { getAllStore } from '../../../storeManager/storeManagerSlice';
import Product from '../../components/Product/Product';
import SaleCodes from '../../components/SaleCodes/SaleCodes';
// import storeImage from '../../../../assets/images/user/food-store.png';
import storeImage from '../../../../assets/images/user/storeImage.webp';
import './productStore.scss';

export default function ProductStore() {
  const dispatch = useDispatch();
  const { storeId } = useParams();

  const [storeInfo, setStoreInfo] = useState(null);
  const [listOwnProducts, setListOwnProducts] = useState(null);
  const [listSaleCode, setListSaleCode] = useState(null);
  const [params, setParams] = useState({ page: 1, perPage: 100 });
  const [storeName, setStoreName] = useState('');

  // fetch get list store
  useEffect(() => {
    const fetchGetListStore = async () => {
      try {
        const result = await dispatch(getAllStore());
        unwrapResult(result);

        const listStoreFind = result.payload;
        if (storeId) {
          const storeInfoFind = listStoreFind.find((store) => store.id === storeId);
          setStoreInfo(storeInfoFind);
          setStoreName(storeInfoFind.name);

          // fetch get list sale code of store
          try {
            const resultListSaleCode = await dispatch(getListSaleCodeById(storeId));
            unwrapResult(resultListSaleCode);
            setListSaleCode(resultListSaleCode.payload);
          } catch (error) {
            console.log(error);
          }
        }

        // fetch get list own product of store
        if (storeName) {
          const params = { q: storeName };
          const fetchGetListOwnProduct = async () => {
            try {
              const result = await dispatch(getProductsByStore(params));
              unwrapResult(result);

              setListOwnProducts(result.payload);
            } catch (error) {
              console.log('Get list product error: ', error);
            }
          };

          fetchGetListOwnProduct();
        }
      } catch (error) {
        console.log('Get list store error: ', error);
      }
    };

    fetchGetListStore();
  }, [dispatch, params, storeName]);

  return (
    <div className="productStoreWrapper storeInfoWrapper">
      <Box className="productStoreInfoWrapper">
        <TitleUserPage title="Information" link="#" />
        <Box className="searchWrapper" style={{ width: '400px', marginBottom: '40px' }}>
          {/* <SearchDebouce
            initialValue={initialValue}
            onSubmit={handleSubmitSearchForm}
            width="400px"
          /> */}
        </Box>
        {storeInfo && (
          <Box
            style={{
              padding: '40px',
              boxShadow: '0 0.5rem 1rem rgb(0 0 0 / 15%)',
              borderRadius: '15px',
            }}
            className="storeInfoContent"
          >
            <img
              className="storeAvatar"
              src={storeInfo.image ? storeInfo.image : storeImage}
              alt="store_avatar"
            />
            <Box className="contentWrapper">
              <TitleAdminStorePage styleTitle={{ fontSize: '23px' }} title="Basic Information" />
              <Box className="basicInfo">
                <Box
                  className="divideContent"
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <Typography variant="p">
                    <b>Name:</b> {storeInfo.name}
                  </Typography>
                  <Typography className="storeInfo" variant="p">
                    <b>Email:</b> {storeInfo.email}
                  </Typography>
                  <Typography className="storeInfo" variant="p">
                    <b>Phone number:</b> {storeInfo.phoneNumber}
                  </Typography>
                </Box>
              </Box>
              <Divider style={{ margin: '30px auto' }} />
              <TitleAdminStorePage styleTitle={{ fontSize: '23px' }} title="Extra Information" />
              <Box className="advanceInfo">
                <Box className="divideContent">
                  <Typography variant="p">
                    <b>Address:</b> {storeInfo.address}
                  </Typography>
                  <Typography className="storeInfo" variant="p">
                    <b>Time Open:</b> {storeInfo.timeOpen || 'Not Available'}
                  </Typography>
                  <Typography className="storeInfo" variant="p">
                    <b>Time Close:</b> {storeInfo.timeOpen || 'Not Available'}
                  </Typography>
                </Box>
                <Box className="divideContent">
                  <Typography variant="p">
                    <b>Status:</b>{' '}
                    {storeInfo.status === 'active' ? (
                      <span>
                        {storeInfo.status}{' '}
                        <CheckCircleOutlineSharpIcon fontSize="small" color="success" />
                      </span>
                    ) : (
                      <span>
                        {storeInfo.status} <DoNotDisturbAltTwoToneIcon color="error" />
                      </span>
                    )}
                  </Typography>
                  <Typography className="storeInfo" variant="p">
                    <b>Is Verify Email:</b>{' '}
                    {storeInfo.isVerify === true ? 'Verified' : 'Not Verified'}
                  </Typography>
                  <Typography className="storeInfo" variant="p">
                    <b>Stars:</b>{' '}
                    <Rating
                      size="small"
                      name="half-rating-read"
                      defaultValue={storeInfo.star}
                      precision={0.5}
                      readOnly
                    />
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Box>

      <Box className="listDiscountStore" style={{ marginBottom: '40px' }}>
        <TitleUserPage title="Sale Codes" link="#" />
        {listSaleCode && listSaleCode?.length > 0 ? (
          <Grid container spacing={{ xs: 2, md: 4 }}>
            {listSaleCode.map((saleCode) => (
              <Grid key={saleCode.id} item xs={12} md={6} lg={2}>
                <SaleCodes style={{ marginBottom: '40px' }} saleCode={saleCode} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box>Sale code is empty</Box>
        )}
      </Box>

      <Box className="listOwnProductStore">
        <TitleUserPage title="Products" link="#" />
        {listOwnProducts && listOwnProducts?.length > 0 ? (
          <Grid container spacing={{ xs: 2, md: 4 }}>
            {listOwnProducts.map((product) => (
              <Grid key={product.id} item xs={12} md={6} lg={2}>
                <Product style={{ marginBottom: '40px' }} data={product} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box>Product is empty</Box>
        )}
      </Box>
    </div>
  );
}
