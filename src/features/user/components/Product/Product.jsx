import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import CurrencyFormat from 'react-currency-format';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import imageUnknown from '../../../../assets/images/common/logo_food_order.png';
import { totalQuantity } from '../../userSlice';
import './product.scss';

export default function Product({ data, img }) {
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart) {
      const productExits = cart.find((item) => item.id === data.id);
      if (productExits) {
        productExits.quantity += 1;
        const NewCart = cart.filter((item) => item.id !== data.id);
        NewCart.push(productExits);
        localStorage.setItem('cart', JSON.stringify(NewCart));
        const total = cart?.reduce((acc, curr) => (acc = acc + curr.quantity), 0);
        dispatch(totalQuantity(total));
      } else {
        const newItem = { ...data, quantity: 1 };
        cart.push(newItem);
        localStorage.setItem('cart', JSON.stringify(cart));
        const total = cart?.reduce((acc, curr) => (acc = acc + curr.quantity), 0);
        dispatch(totalQuantity(total));
      }
    } else {
      const cartItem = { ...data, quantity: 1 };
      localStorage.setItem('cart', JSON.stringify([cartItem]));
      dispatch(totalQuantity(1));
    }
  };

  return (
    <div className="productWrapper">
      <Card>
        <CardMedia
          component="img"
          alt="green iguana"
          height="200"
          style={{ objectFit: 'contain' }}
          image={data.images ? data.images[0] : imageUnknown}
        />
        <CardContent>
          <Link className="textDecorationNone nameLinkProduct" to={`/product/${data.id}`}>
            <Typography gutterBottom variant="h5" component="div">
              <b>{data.name}</b>
            </Typography>
          </Link>
          {/* <Typography variant="body2" color="text.secondary">
            {data.description}
          </Typography> */}
          <Typography style={{ fontSize: '18px' }} variant="body2" color="text.secondary">
            <b>
              <CurrencyFormat value={data.price} displayType={'text'} thousandSeparator={true} />{' '}
              VNĐ
            </b>
          </Typography>
        </CardContent>
        <CardActions>
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
            size="small"
            variant="contained"
            color="secondary"
            onClick={handleAddToCart}
          >
            Add to cart
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
