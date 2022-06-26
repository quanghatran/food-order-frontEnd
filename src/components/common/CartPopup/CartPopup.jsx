import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import ItemCartPopup from './ItemCartPopup';
import { useDispatch } from 'react-redux';
import { totalQuantity } from '../../../features/user/userSlice';

const CartPopup = () => {
  const [itemDel, setItemDel] = useState();
  const [item, setItem] = useState();
  const [qty, setQty] = useState(() => {
    const cartItem = JSON.parse(localStorage.getItem('cart'));
    const total = cartItem?.reduce((acc, curr) => (acc = acc + curr.quantity), 0);
    return total;
  });
  const dispatch = useDispatch();
  const cart = JSON.parse(localStorage.getItem('cart'));
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const newCart = cart?.filter((el) => el.id !== itemDel?.id);
    if (cart) {
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
    setItem(newCart);
    dispatch(totalQuantity(qty));
  }, [qty]);
  const handleDeleteItemCart = (item) => {
    setItemDel(item);
    setQty((counter) => counter - item.quantity);
  };

  if (cart) {
    if (cart.length === 0) {
      return <Box>Nothing In Cart</Box>;
    } else
      return (
        <Box>
          {cart?.map((item) => {
            return (
              <Box key={item.id}>
                <ItemCartPopup {...item} item={item} onDelete={handleDeleteItemCart} />
              </Box>
            );
          })}
        </Box>
      );
  } else {
    return <Box>Nothing In Cart</Box>;
  }
};
export default CartPopup;
