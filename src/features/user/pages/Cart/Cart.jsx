import { Box, Button, Divider, Rating, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { MobileDateTimePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { unwrapResult } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ItemCart from '../../../../components/common/CartItem/ItemCart';
import PopUpConfirm from '../../../../components/common/PopUpConfirm/PopUpConfirm';
import TitleUserPage from '../../../../components/common/TitleUserPage/TitleUserPage';
import { getListSaleCodeById } from '../../../saleCode/saleCodeSlice';
import { getAllStore } from '../../../storeManager/storeManagerSlice';
import { postOrder, totalQuantity } from '../../userSlice';
import './cart.scss';

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [itemDel, setItemDel] = useState();
  const [item, setItem] = useState();
  const [qty, setQty] = useState(() => {
    const cartItem = JSON.parse(localStorage.getItem('cart'));
    const total = cartItem?.reduce((acc, curr) => (acc = acc + curr.quantity), 0);
    return total;
  });
  const [listSaleCode, setListSaleCode] = useState(null);
  const [storeInfo, setStoreInfo] = useState(null);
  const [timePick, setTimePick] = useState(new Date());
  const [discount, setDiscount] = useState('');
  const [paymetMethod, setPaymetMethod] = useState('cash');
  const [subtotal, setSubtotal] = useState(0);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isConfirmAlertOpen, seIsConfirmAlertOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountId, setDiscountId] = useState('');

  const useInfo = JSON.parse(localStorage.getItem('account'));

  const { totalQuantityItemCart } = useSelector((state) => state.user);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const newCart = cart?.filter((el) => el.id !== itemDel?.id);
    if (newCart) {
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
    setItem(newCart);

    if (newCart) {
      const fetchGetStoreInfo = async () => {
        try {
          const result = await dispatch(getAllStore());
          unwrapResult(result);

          const listStoreFind = result.payload;
          const storeInfoFind = listStoreFind.find((store) => store.id === newCart[0].storeId);
          setStoreInfo(storeInfoFind);
          const cartPrice = JSON.parse(localStorage.getItem('cartPrice'));

          // setItemPrice(cartPrice);
          setSubtotal(cartPrice - (cartPrice * discount) / 100);

          try {
            const resultListSaleCode = await dispatch(getListSaleCodeById(newCart[0].storeId));
            unwrapResult(resultListSaleCode);
            setListSaleCode(resultListSaleCode.payload);
          } catch (error) {
            console.log(error);
          }
        } catch (error) {
          console.log('Get list store error: ', error);
        }
      };

      fetchGetStoreInfo();
    }

    // dispatch(totalQuantity(qty));
  }, [dispatch, qty, discount, totalQuantityItemCart]);

  useEffect(() => {
    const totalPrice = JSON.parse(localStorage.getItem('cartPrice'));

    setTotalPrice(totalPrice);
  }, [totalQuantityItemCart]);

  const handleDeleteItemCart = (item) => {
    setItemDel(item);
    setQty((counter) => counter - item.quantity);
  };

  const handleDiscountChange = (event) => {
    if (event.target.value && listSaleCode) {
      const selectedSaleCode = listSaleCode.find(
        (saleCode) => saleCode.discountPercent === event.target.value
      );
      setDiscountId(selectedSaleCode.id);
    }

    // console.log(event);
    setDiscount(event.target.value);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymetMethod(event.target.value);
  };

  const handleConfirmOpen = () => {
    if (useInfo) {
      setIsConfirmOpen(true);
    } else {
      seIsConfirmAlertOpen(true);
    }
  };

  const handleConfirmClose = () => {
    setIsConfirmOpen(false);
  };

  const onConfirmSubmit = async () => {
    const cartItem = JSON.parse(localStorage.getItem('cart'));
    if (cartItem) {
      const items = cartItem.reduce(function (prev, curr) {
        const currItem = {
          productId: curr.id,
          quantity: curr.quantity,
        };

        prev.push(currItem);
        return prev;
      }, []);

      const data = {
        items: items,
        paymentType: 'cash',
        timeReceive: timePick,
        discountId: discountId,
      };

      console.log('check out: ', data);
      if (data) {
        try {
          const result = await dispatch(postOrder(data));
          unwrapResult(result);

          dispatch(totalQuantity(0));
          navigate('/orderHistory');
          localStorage.removeItem('cart');
          localStorage.removeItem('productStoreId');
          localStorage.removeItem('cartPrice');

          toast.success('Check out success');
        } catch (error) {
          toast.error('Faield to checkout the cart');
        }
      }
    }
  };

  const handleConfirmAlertClose = () => {
    seIsConfirmAlertOpen(false);
  };

  const onConfirmAlertSubmit = async () => {
    navigate('/auth/login');
  };

  return (
    <>
      <TitleUserPage title="Cart" link="/#" />
      <div className="cartWrapper">
        {item ? (
          <>
            <Box className="listProductSelectedWrapper">
              {item.map((item, index) => (
                <Box key={index} className="listProductSelected">
                  <ItemCart {...item} item={item} onDelete={handleDeleteItemCart} />
                </Box>
              ))}
            </Box>
            <Box className="checkoutInformation">
              <Box className="userReceiveDetail">
                <div className="cartAccountWrapper">
                  <div className="storeInfo">
                    <h3 className="cartTitle">Restaurant Detail</h3>
                    {storeInfo ? (
                      <div className="storeInfoWrapper">
                        {/* <img
                          className="storeImage"
                          alt="store_image"
                          src={storeInfo.images ? storeInfo.images : storeImage}
                        /> */}
                        <div className="storeDetail">
                          <p>
                            <b>Name:</b> {storeInfo.name}
                          </p>
                          <p>
                            <b>Phone Number:</b> {storeInfo.phoneNumber}
                          </p>
                          <p>
                            <b>Address:</b> {storeInfo.address}
                          </p>
                          <Rating
                            name="read-only"
                            // size="small"
                            defaultValue={storeInfo.star}
                            precision={0.5}
                            readOnly
                          />
                        </div>
                      </div>
                    ) : (
                      <p style={{ color: 'yellow' }}>Error when loading restaurant information</p>
                    )}
                  </div>
                  <div className="accountInfo">
                    <h3 className="cartTitle">Account Detail</h3>
                    {useInfo ? (
                      <div className="storeInfoWrapper">
                        <div className="storeDetail">
                          <p>
                            <b>Name:</b> {useInfo.name}
                          </p>
                          <p>
                            <b>Phone Number:</b> {useInfo.phoneNumber}
                          </p>
                          <p>
                            <b>Email:</b> {useInfo.email}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p style={{ color: 'red' }}>
                        You are using as a Guest, please login to continued
                      </p>
                    )}
                  </div>
                </div>
              </Box>
              <Divider className="cartDivider" />
              <Box className="checkoutOption">
                <h3 className="cartTitle">Checkout Option</h3>

                <div className="cartSelectionWrapper">
                  <div className="selectionDiscount">
                    <p style={{ marginBottom: '10px' }}>
                      <span>Discount:</span>
                    </p>
                    <FormControl fullWidth>
                      <Select id="discount" value={discount} onChange={handleDiscountChange}>
                        {listSaleCode &&
                          listSaleCode.map((saleCode) => (
                            <MenuItem key={saleCode.id} value={saleCode.discountPercent}>
                              {saleCode.name}
                            </MenuItem>
                          ))}
                        <MenuItem value={'0'}>Other</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="selectionPaymetMethod">
                    <p style={{ marginBottom: '10px' }}>
                      <span>Payment Method:</span>
                    </p>
                    <FormControl fullWidth>
                      <Select
                        id="paymentMethod"
                        value={paymetMethod}
                        onChange={handlePaymentMethodChange}
                      >
                        <MenuItem value={'cash'}>Cash</MenuItem>
                        <MenuItem disabled={true} value={'card'}>
                          Card
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <p style={{ marginBottom: '0px', marginTop: '20px' }}>
                    <span>Time Pick Up:</span>
                  </p>
                  {/* <TimePicker
                    autoOk
                    variant="inline"
                    inputVariant="outlined"
                    value={timePick}
                    onChange={(newValue) => {
                      setTimePick(newValue);
                    }}
                    renderInput={(params) => <TextField margin="normal" fullWidth {...params} />}
                  /> */}

                  <MobileDateTimePicker
                    value={timePick}
                    onChange={(newValue) => {
                      setTimePick(newValue);
                    }}
                    minDate={new Date()}
                    inputFormat="hh:mm a - dd/MM/yyyy"
                    mask="___/__/__ __:__ _M"
                    renderInput={(params) => <TextField margin="normal" fullWidth {...params} />}
                  />
                </LocalizationProvider>
                <Divider className="cartDivider" />
              </Box>
              <Box className="priceInfo">
                <h3 className="cartTitle">Order Price</h3>
                <div className="priceWrapper">
                  <p className="price">
                    <b>Item Price:</b>{' '}
                    <CurrencyFormat
                      value={totalPrice}
                      displayType={'text'}
                      thousandSeparator={true}
                    />
                    đ
                  </p>
                  <p className="price">
                    <b>Discount:</b> {+discount ? discount : '0'}%
                  </p>
                </div>
              </Box>
              <Box>
                <p className="subtotal">
                  <b>Subtotal:</b>{' '}
                  <CurrencyFormat
                    value={Math.ceil(subtotal)}
                    displayType={'text'}
                    thousandSeparator={true}
                  />
                  đ
                </p>
              </Box>
              <Button
                size="large"
                variant="contained"
                fullWidth
                onClick={(e) => handleConfirmOpen()}
              >
                Checkout
              </Button>
            </Box>
          </>
        ) : (
          <Box className="listProductSelected">The cart is empty</Box>
        )}

        {/* popup confirm order */}
        <PopUpConfirm
          dialogTitle="Confirm checkout this order"
          dialogContent="Are you sure want confirm checkout this order"
          isConfirmOpen={isConfirmOpen}
          handleConfirmClose={handleConfirmClose}
          onConfirmSubmit={onConfirmSubmit}
        />

        {/* popup required log in */}
        <PopUpConfirm
          dialogTitle="Required log in!"
          dialogContent="You must to log in to use this feature"
          isConfirmOpen={isConfirmAlertOpen}
          handleConfirmClose={handleConfirmAlertClose}
          onConfirmSubmit={onConfirmAlertSubmit}
        />
      </div>
    </>
  );
}
