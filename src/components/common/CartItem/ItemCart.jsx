import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, IconButton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { totalQuantity } from '../../../features/user/userSlice';
import './itemCart.scss';

const ItemCart = ({ price, quantity, name, images, item, onDelete }) => {
  const [qty, setQty] = useState(quantity);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    toast.success('Update cart success!');
    setQty((counter) => counter + 1);
  };

  const handleMinusQty = () => {
    toast.success('Update cart success!');
    setQty((counter) => counter - 1);
  };

  const handleClickShowItemDetail = (itemId) => {
    navigate(`/product/${itemId}`);
  };

  return (
    <Box>
      <Box className="itemCartWrapper">
        <Box className="itemCartDetail">
          <img
            width={150}
            height={150}
            style={{ objectFit: 'cover', borderRadius: '10px', cursor: 'pointer' }}
            src={images[0]}
            alt={name}
            onClick={() => handleClickShowItemDetail(item.id)}
          />
          <Box className="contentWrapper">
            <h3 className="cartTitle" onClick={() => handleClickShowItemDetail(item.id)}>
              {name}
            </h3>
            {/* <Rating name="read-only" defaultValue={4.5} precision={0.5} readOnly /> */}
            <p>{item.boughtNum} Bought</p>
            <p className="productPrice">
              {' '}
              <CurrencyFormat value={price} displayType={'text'} thousandSeparator={true} />đ
            </p>
          </Box>
        </Box>
        <Box style={{ display: 'flex', alignItem: 'center', gap: '10px' }}>
          <Box className="modifyItemCart">
            <IconButton
              aria-label="delete"
              color="primary"
              disabled={qty === 0 ? true : false}
              onClick={() => handleMinusQty(item)}
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
                {qty}
              </Typography>
            </Box>

            <IconButton onClick={() => handleAddQty(item)} aria-label="delete" color="primary">
              <AddIcon />
            </IconButton>
          </Box>

          <Box gridColumn="span 2" className="totalCart">
            <Box style={{ fontSize: '18px', fontWeight: '500' }}>
              <CurrencyFormat value={qty * price} displayType={'text'} thousandSeparator={true} />đ
            </Box>
            <IconButton onClick={() => onDelete(item)} color="error">
              <DeleteOutlineOutlinedIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default ItemCart;
