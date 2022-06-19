import { Box, Button, Typography } from '@mui/material';

const ItemCart = ({ price, quantity, name, images }) => {
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
              disabled={quantity * price === 0 ? true : false}
            >
              -
            </Button>
            <Typography>{quantity}</Typography>
            <Button className="CartItem--quanity-btn">+</Button>
          </Box>
        </Box>
        <Box gridColumn="span 2" className="CartItem" position="relative">
          <Box>{quantity * price} $</Box>
          <span className="CardItem-Close">X</span>
        </Box>
      </Box>
    </Box>
  );
};
export default ItemCart;
