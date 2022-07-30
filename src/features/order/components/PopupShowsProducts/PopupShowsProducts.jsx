import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@mui/material';
import { Box } from '@mui/system';
import CurrencyFormat from 'react-currency-format';
import './popupShowsProducts.scss';

export default function PopupShowsProducts({
  isPopupShowsProductsOpen,
  handleClosePopupProducts,
  dataListProduct,
}) {
  return (
    <Dialog
      className="popupShowsProductsWrapper"
      open={isPopupShowsProductsOpen}
      onClose={handleClosePopupProducts}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        style={{ backgroundColor: '#3dbe9c', marginBottom: '20px', color: '#fff' }}
        id="alert-dialog-title"
      >
        Products Order
      </DialogTitle>
      <DialogContent>
        {dataListProduct ? (
          dataListProduct.map((product) => (
            <div key={product.productid} className="listProductWrapper">
              <img
                src={product.images[0]}
                width="90"
                height="90"
                alt="product"
                style={{
                  objectFit: 'cover',
                  borderRadius: '15px',
                  boxShadow: '0 0.5rem 1rem rgb(0 0 0 / 15%)',
                }}
              />
              <Box px={3}>
                <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>
                  {' '}
                  {product.name}
                </div>
                <div>
                  <div>
                    Price:{' '}
                    <b>
                      <CurrencyFormat
                        value={product.price}
                        displayType={'text'}
                        thousandSeparator={true}
                      />
                      đ
                    </b>
                  </div>
                  <div>
                    Quantity: <b>{product.quantity}</b>
                  </div>
                </div>
              </Box>
              <Divider />
            </div>
          ))
        ) : (
          <div>Get error when show products</div>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          onClick={handleClosePopupProducts}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
