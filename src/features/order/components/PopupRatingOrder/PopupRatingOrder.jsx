import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Rating,
} from '@mui/material';
import { Box } from '@mui/system';
import moment from 'moment';
import './popupRatingOrder.scss';

export default function PopupRatingOrder({
  isRatingOrder,
  handleCloseRatingOrder,
  dataRatingOrder,
}) {
  return (
    <Dialog
      className="popupRatingOrderWrapper"
      open={isRatingOrder}
      onClose={handleCloseRatingOrder}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <form className="formWrapper">
        <DialogTitle
          style={{ backgroundColor: '#3dbe9c', marginBottom: '20px', color: '#fff' }}
          id="alert-dialog-title"
        >
          Rating Order
        </DialogTitle>
        <DialogContent>
          {dataRatingOrder && !Array.isArray(dataRatingOrder) ? (
            <div key={dataRatingOrder.id} className="listProductWrapper">
              <img
                src={dataRatingOrder?.images[0]}
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
                  {dataRatingOrder?.content}
                </div>
                <div>
                  Day rating: <b>{moment(dataRatingOrder?.created_at).format('DD MMM YYYY')}</b>
                </div>
                <div>
                  Starts:{' '}
                  <Rating
                    size="small"
                    style={{ marginTop: '10px' }}
                    name="half-rating-read"
                    defaultValue={dataRatingOrder?.star}
                    precision={0.5}
                    readOnly
                  />{' '}
                  ({dataRatingOrder?.star})
                </div>
              </Box>
              <Divider />
            </div>
          ) : (
            <div>Don`t have rating detail yet!</div>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            onClick={handleCloseRatingOrder}
          >
            Close
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
