import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';
import imageUnknown from '../../../../assets/images/common/logo_food_order.png';
import './product.scss';

export default function Product({ img }) {
  return (
    <div className="productWrapper">
      <Card>
        <CardMedia
          component="img"
          alt="green iguana"
          height="150"
          image={img ? img : imageUnknown}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            className="productButtonAddCart"
            size="small"
            variant="contained"
            color="secondary"
          >
            Add to cart
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
