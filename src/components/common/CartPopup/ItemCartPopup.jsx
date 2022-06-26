import ClearIcon from '@mui/icons-material/Clear';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Box, Divider, Typography } from '@mui/material';
import CurrencyFormat from 'react-currency-format';
import './itemCartPopup.scss';

const ItemCartPopup = ({ name, price, quantity, item, images, onDelete }) => {
  return (
    <Box className="Item-Group">
      <Box className="Item-Info">
        <Box className="Item-Info-img">
          <img
            src={images[0]}
            alt={name}
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '6px',
              boxShadow: '0 0.5rem 1rem rgb(0 0 0 / 15%)',
            }}
          />
        </Box>
        <Box className="itemDetailWrapper">
          <Box className="Item-Info-Group">
            <Typography variant="subtitle1" className="Item-Info-name">
              {name}
            </Typography>
            <Typography variant="subtitle1" className="Item-Info-totalPrice">
              <span>{quantity}</span>
              <span>
                <ClearIcon fontSize="small" style={{ marginTop: '7px', fontSize: '15px' }} />
              </span>
              <span>
                <CurrencyFormat value={price} displayType={'text'} thousandSeparator={true} />đ
              </span>
            </Typography>
          </Box>
          <Box className="closeItemPopUp" onClick={() => onDelete(item)}>
            <DeleteOutlineOutlinedIcon color="error" />
          </Box>
        </Box>
      </Box>
      {/* <Divider /> */}
    </Box>
  );
};
export default ItemCartPopup;
