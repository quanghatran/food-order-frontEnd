import { Box, Button } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import ItemCart from '../../../../components/common/CartItem/ItemCart';
import TitleUserPage from '../../../../components/common/TitleUserPage/TitleUserPage';
import { totalQuantity } from '../../userSlice';

import './cart.scss';

export default function Cart() {
  const [itemDel, setItemDel] = useState();
  const [item, setItem] = useState();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(() => {
    const cartItem = JSON.parse(localStorage.getItem('cart'));
    const total = cartItem?.reduce((acc, curr) => (acc = acc + curr.quantity), 0);
    return total;
  });
  const [listSaleCode, getListSaleCode] = useState(null);

  const useInfo = JSON.parse(localStorage.getItem('account'));

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const newCart = cart?.filter((el) => el.id !== itemDel?.id);
    localStorage.setItem('cart', JSON.stringify(newCart));
    setItem(newCart);
    dispatch(totalQuantity(qty));
  }, [qty]);

  const handleDeleteItemCart = (item) => {
    setItemDel(item);
    setQty((counter) => counter - item.quantity);
  };

  console.log(item);

  console.log(listSaleCode);
  return (
    <>
      <TitleUserPage title="Cart" link="/#" />
      <div className="cartWrapper">
        <Box className="listProductSelectedWrapper">
          {item &&
            item?.map((item, index) => (
              <Box key={index} className="listProductSelected">
                <ItemCart {...item} item={item} onDelete={handleDeleteItemCart} />
              </Box>
            ))}
        </Box>
        <Box className="checkoutInformation">
          <Box className="userReceiveDetail">
            <h2 style={{ fontWeight: '500' }}>User`s Order Detail</h2>
            {useInfo ? (
              <div>
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
            ) : (
              <p>You are using as a Guest, please login to continued</p>
            )}
          </Box>
          <Box className="checkoutOption">
            <h2 style={{ fontWeight: '500' }}>Checkout Option</h2>
            <Select
              isMulti
              name="discount"
              // options={listSelectCategory}
              className="basic-multi-select"
              classNamePrefix="select"
              // onChange={handleCategoriesChange}
            />
            <p>placed for selection sale code</p>
            <p>Time receive : time checker</p>
            <p>placed for selection payment method</p>
          </Box>
          <Box className="priceInfo">
            <h3>Order Price</h3>
            <p>Item price</p>
            <p>discount</p>
            <p>subtotal</p>
          </Box>
          <Button variant="contained" color="secondary">
            Checkout
          </Button>
        </Box>
      </div>
    </>
  );
}
