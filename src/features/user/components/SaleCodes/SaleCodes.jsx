import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import moment from 'moment';
import { Navigate, useNavigate } from 'react-router-dom';
import './saleCodes.scss';

export default function SaleCodes({ saleCode }) {
  const navigate = useNavigate();
  const handleClickUserSaleCode = () => {
    navigate('/cart');
  };

  return (
    <>
      {saleCode && (
        <div className="saleCodeWrapper">
          <Box className="saleCodeBox">
            <Typography className="saleCodeName" variant="p">
              {saleCode.name}
            </Typography>
            <Typography className="saleCodePercent" variant="p">
              {saleCode.discountPercent}%
            </Typography>
            <Box className="saleCodeTimeBox">
              <span>{moment(saleCode.start).format('DD MMMM')} </span> <ArrowForwardRoundedIcon />
              <span>{moment(saleCode.end).format('DD MMMM')}</span>
            </Box>
            <Button
              variant="contained"
              className="saleCodeButton"
              onClick={handleClickUserSaleCode}
            >
              Use Now
            </Button>
          </Box>
        </div>
      )}
    </>
  );
}
