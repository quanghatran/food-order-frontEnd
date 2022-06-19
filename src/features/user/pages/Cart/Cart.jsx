import { Box } from '@mui/material';
import ItemCart from '../../../../components/common/CartItem/ItemCart';
import './cart.scss';

export default function Cart() {
  const cartItem = JSON.parse(localStorage.getItem('cart'));
  console.log(cartItem);
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
        {cartItem &&
          cartItem?.map((item, index) => (
            <Box key={index}>
              <ItemCart {...item} />
            </Box>
          ))}
      </Box>
    </div>
  );
}
