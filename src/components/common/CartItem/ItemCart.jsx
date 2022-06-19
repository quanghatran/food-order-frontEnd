import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { totalQuantity } from '../../../features/user/userSlice';
const ItemCart = ({ price, quantity, name, images, item, onDelete }) => {
  const [qty, setQty] = useState(quantity);
  const dispatch = useDispatch();
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const newItem = { ...item, quantity: qty };
    const newCart = cart.filter((item) => item.id !== newItem.id);
    newCart.push(newItem);
    localStorage.setItem('cart', JSON.stringify(newCart));
    const total = newCart?.reduce((acc, curr) => (acc = acc + curr.quantity), 0);
    dispatch(totalQuantity(total));
  }, [qty, dispatch, item]);
  const handleAddQty = () => {
    setQty((counter) => counter + 1);
  };
  const handleMinusQty = () => {
    setQty((counter) => counter - 1);
  };
  return (
    <Box>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" className="CartItem-container">
        <Box gridColumn="span 2" className="CartItem">
          <Box>
            <img src={images[0]} alt={name} />
          </Box>
        </Box>
        <Box gridColumn="span 3" className="CartItem">
          <Box>{name}</Box>
        </Box>
        <Box gridColumn="span 2" className="CartItem">
          <Box>{price} $</Box>
        </Box>
        <Box gridColumn="span 3" className="CartItem">
          <Box>
            <Button
              className="CartItem--quanity-btn"
              disabled={qty === 0 ? true : false}
              onClick={() => handleMinusQty(item)}
            >
              -
            </Button>
            <Typography>{qty}</Typography>
            <Button className="CartItem--quanity-btn" onClick={() => handleAddQty(item)}>
              +
            </Button>
          </Box>
        </Box>
        <Box gridColumn="span 2" className="CartItem" position="relative">
          <Box>{qty * price} $</Box>
          <span className="CardItem-Close" onClick={() => onDelete(item)}>
            X
          </span>
        </Box>
      </Box>
    </Box>
  );
};
export default ItemCart;
