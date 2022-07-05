import { Button, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import imageUnknown from '../../../../assets/images/common/logo_food_order.png';
import PopUpConfirm from '../../../../components/common/PopUpConfirm/PopUpConfirm';
import { totalQuantity } from '../../userSlice';
import './product.scss';

export default function Product({ data }) {
  const dispatch = useDispatch();
  const [productClickedId, setProductClickedId] = useState('');
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleConfirmClose = () => {
    setIsConfirmOpen(false);
  };

  const handleAddToCart = (productClickedId) => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const storeId = data.storeId;
    setProductClickedId(productClickedId);

    if (cart) {
      const productExits = cart.find((item) => item.id === data.id);

      if (productExits) {
        productExits.quantity += 1;
        const NewCart = cart.filter((item) => item.id !== data.id);
        NewCart.push(productExits);
        localStorage.setItem('cart', JSON.stringify(NewCart));
        const total = cart?.reduce((acc, curr) => (acc = acc + curr.quantity), 0);
        dispatch(totalQuantity(total));
        toast.success('Update cart success!');
      } else {
        let productStoreId = localStorage.getItem('productStoreId');

        if (data.storeId === productStoreId) {
          const newItem = { ...data, quantity: 1 };
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
      const cartItem = { ...data, quantity: 1 };
      localStorage.setItem('cart', JSON.stringify([cartItem]));
      dispatch(totalQuantity(1));
      toast.success('Add product to cart success!');
    }
  };

  // delete current cart and create new cart
  const handleCreateNewCart = (productClickedId) => {
    const storeId = data.storeId;
    setProductClickedId(productClickedId);
    const cartItem = { ...data, quantity: 1 };

    localStorage.setItem('productStoreId', storeId);
    localStorage.setItem('cart', JSON.stringify([cartItem]));

    dispatch(totalQuantity(1));
    toast.success('Update cart success!');
    setIsConfirmOpen(false);
  };

  return (
    <div className="productWrapper">
      <Box>
        <CardMedia
          component="img"
          alt="green"
          height="200"
          image={data.images ? data.images[0] : imageUnknown}
        />
        <CardContent style={{ marginRight: '10px' }}>
          <Link className="textDecorationNone nameLinkProduct" to={`/product/${data.id}`}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontSize: '20px', fontWeight: '400' }}
            >
              {data.name}
            </Typography>
          </Link>
          {/* <Rating name="read-only" defaultValue={4.5} precision={0.5} readOnly /> */}
          <Box style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            <Typography
              style={{ fontSize: '17px', fontWeight: '400' }}
              variant="p"
              color="text.secondary"
            >
              <CurrencyFormat value={data.price} displayType={'text'} thousandSeparator={true} />đ
            </Typography>
            <Typography
              style={{ fontSize: '17px', fontWeight: '400' }}
              variant="p"
              color="text.secondary"
            >
              {data.boughtNum} Bought
            </Typography>
          </Box>
        </CardContent>
        <CardActions
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginRight: '10px',
          }}
        >
          <Link
            style={{ marginRight: '15px', marginLeft: '10px' }}
            className="textDecorationNone nameLinkProduct"
            to={`/product/${data.id}`}
          >
            <Button
              className="productButtonAddCart"
              size="small"
              variant="contained"
              color="primary"
            >
              Detail
            </Button>
          </Link>
          <Button
            className="productButtonAddCart"
            variant="contained"
            size="small"
            color="secondary"
            style={{ color: '#fff' }}
            onClick={() => handleAddToCart(data.id)}
          >
            Add to cart
          </Button>
        </CardActions>
      </Box>

      {data.id === productClickedId && (
        <PopUpConfirm
          dialogTitle="Start new cart?"
          dialogContent="Would you like to clear the current cart and add this item instead"
          isConfirmOpen={isConfirmOpen}
          handleConfirmClose={handleConfirmClose}
          onConfirmSubmit={() => handleCreateNewCart(data.id)}
        />
      )}
    </div>
  );
}
