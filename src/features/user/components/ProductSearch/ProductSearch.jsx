import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import CurrencyFormat from 'react-currency-format';
import { Link } from 'react-router-dom';
import imageUnknown from '../../../../assets/images/common/logo_food_order.png';
import './productSearch.scss';
export default function ProductSearch({ data, img }) {
  return (
    <div className="productWrapper">
      <Card>
        <CardMedia
          component="img"
          alt="green iguana"
          height="200"
          style={{ objectFit: 'contain' }}
          image={data.Product_images ? data.Product_images[0] : imageUnknown}
        />
        <CardContent>
          <Link className="textDecorationNone nameLinkProduct" to={`/product/${data.Product_id}`}>
            <Typography gutterBottom variant="h5" component="div">
              <b>{data.Product_name}</b>
            </Typography>
          </Link>
          {/* <Typography variant="body2" color="text.secondary">
            {data.description}
          </Typography> */}
          <Typography style={{ fontSize: '18px' }} variant="body2" color="text.secondary">
            <b>
              <CurrencyFormat
                value={data.Product_price}
                displayType={'text'}
                thousandSeparator={true}
              />{' '}
              VNĐ
            </b>
          </Typography>
        </CardContent>
        <CardActions>
          <Link
            style={{ marginRight: '15px', marginLeft: '10px' }}
            className="textDecorationNone nameLinkProduct"
            to={`/product/${data.Product_id}`}
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
          >
            Add to cart
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
