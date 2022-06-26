import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from '@mui/material';
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
      <Card>
        <CardMedia
          component="img"
          alt="green iguana"
          height="200"
          image={data.images ? data.images[0] : imageUnknown}
        />
        <CardContent>
          <Link className="textDecorationNone nameLinkProduct" to={`/product/${data.id}`}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontSize: '25px', fontWeight: '500' }}
            >
              {data.name}
            </Typography>
          </Link>
          <Rating name="read-only" defaultValue={4.5} precision={0.5} readOnly />
          <Typography style={{ fontSize: '18px' }} variant="body2" color="text.secondary">
            <b>
              <CurrencyFormat value={data.price} displayType={'text'} thousandSeparator={true} />đ
            </b>
          </Typography>
        </CardContent>
        <CardActions>
          <Link
            style={{ marginRight: '15px', marginLeft: '10px' }}
            className="textDecorationNone nameLinkProduct"
            to={`/product/${data.id}`}
          >
            <Button className="productButtonAddCart" variant="contained" color="primary">
              Detail
            </Button>
          </Link>
          <Button
            className="productButtonAddCart"
            variant="contained"
            color="secondary"
            onClick={() => handleAddToCart(data.id)}
          >
            Add to cart
          </Button>
        </CardActions>
      </Card>

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
