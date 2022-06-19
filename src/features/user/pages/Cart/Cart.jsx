import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ItemCart from '../../../../components/common/CartItem/ItemCart';
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
  return (
    <div>
      <Box mb="44px">
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          className="CartItemTitle-container"
        >
          <Box gridColumn="span 2" className="CartItemTitle">
            Image
          </Box>
          <Box gridColumn="span 3" className="CartItemTitle">
            Product
          </Box>
          <Box gridColumn="span 2" className="CartItemTitle">
            Price
          </Box>
          <Box gridColumn="span 3" className="CartItemTitle">
            Quantity
          </Box>
          <Box gridColumn="span 2" className="CartItemTitle">
            Total
          </Box>
        </Box>
        {item &&
          item?.map((item, index) => (
            <Box key={index}>
              <ItemCart {...item} item={item} onDelete={handleDeleteItemCart} />
            </Box>
          ))}
      </Box>
    </div>
  );
}
