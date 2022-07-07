import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import dateFormat from 'dateformat';
import { useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import userApi from '../../../../api/userApi';
import PopUpConfirm from '../../../../components/common/PopUpConfirm/PopUpConfirm';
import TitleUserPage from '../../../../components/common/TitleUserPage/TitleUserPage';
import PopupRating from '../../components/PopupRating/PopupRating';
import { cancelOrder, ratingOrder } from '../../userSlice';
import './orderHistory.scss';

const OrderHistory = () => {
  const dispatch = useDispatch();

  const [orderHistory, setOrderHistory] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [idOrder, setIdOrder] = useState('');
  const [isRatingOpen, setIsRatingOpen] = useState(false);

  const userInfo = JSON.parse(localStorage.getItem('accountInfo'));

  useEffect(() => {
    const getHistoryOrders = async () => {
      try {
        const response = await userApi.getHistoryOrder();
        setOrderHistory(response);
      } catch (error) {
        console.log('get history order error: ', error);
      }
    };

    getHistoryOrders();
  }, [idOrder]);

  const handleOpenCancelOrderConfirm = (idOrder) => {
    if (idOrder) {
      setIdOrder(idOrder);
    }
    setIsConfirmOpen(true);
  };

  const handleConfirmClose = () => {
    setIsConfirmOpen(false);
    setIdOrder('');
  };

  // handle cancel order
  const onConfirmSubmit = async () => {
    try {
      const result = await dispatch(cancelOrder(idOrder));
      unwrapResult(result);
      toast.success('Cancel order successfully');
    } catch (error) {
      toast.error('Cancel order failed');
    }

    setIsConfirmOpen(false);
    setIdOrder('');
  };

  const checkStatusColor = (status) => {
    if (status === 'pending') {
      return '#f0932b';
    } else if (status === 'confirm' || status === 'success') {
      return 'green';
    } else if (status === 'failed') {
      return 'red';
    } else {
      return 'rgba(0, 0, 0, 0.26)';
    }
  };

  const handleOPenRatingOrder = (idOrder) => {
    setIdOrder(idOrder);
    setIsRatingOpen(true);
  };

  const handleRatingClose = () => {
    setIsRatingOpen(false);
  };

  const handleRatingSubmit = async (dataRating) => {
    const data = {
      idOrder,
      dataRating,
    };
    try {
      const result = await dispatch(ratingOrder(data));
      unwrapResult(result);

      toast.success('Rating order successfully');
    } catch (error) {
      toast.error('Rating order failed');
    }

    setIsRatingOpen(false);
    setIdOrder('');
  };

  console.log(orderHistory);
  return (
    <Box className="orderHistoryWrapper">
      <TitleUserPage title="Orders History" link="#" />
      <TableContainer className="tableContainer" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead style={{ background: '#3dbe9c', color: '#fff' }}>
            <TableRow>
              <TableCell className="tableHeaderItem" align="center">
                My Orders
              </TableCell>
              <TableCell className="tableHeaderItem" align="center">
                Status
              </TableCell>
              <TableCell className="tableHeaderItem" align="center">
                Total Price
              </TableCell>
              <TableCell className="tableHeaderItem" align="center">
                Type Payment
              </TableCell>
              <TableCell className="tableHeaderItem" align="center">
                Payment
              </TableCell>
              <TableCell className="tableHeaderItem" align="center">
                Time Receive
              </TableCell>
              <TableCell className="tableHeaderItem" align="center">
                Modify
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderHistory &&
              orderHistory.map(
                (item) =>
                  item.totalPrice > 0 && (
                    <TableRow
                      key={item.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="center" component="th" scope="row">
                        <Box className="userDetail">
                          <img
                            style={{ objectFit: 'cover' }}
                            src={userInfo.avatar}
                            width="55"
                            height="55"
                            alt="user"
                          />
                        </Box>
                      </TableCell>
                      {/* <TableCell align="center">
                    <Rating
                      size="small"
                      style={{ marginTop: '10px' }}
                      name="half-rating-read"
                      defaultValue={item.star}
                      precision={0.5}
                      readOnly
                    />
                  </TableCell> */}
                      <TableCell align="center">
                        <Box className="phoneNumber">
                          <b
                            style={{
                              color: `${checkStatusColor(item.status)}`,
                            }}
                          >
                            {item.status}
                          </b>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <CurrencyFormat
                          value={item.totalPrice}
                          displayType={'text'}
                          thousandSeparator={true}
                        />
                        đ
                      </TableCell>
                      <TableCell align="center">{item.paymentType}</TableCell>
                      <TableCell align="center">
                        {item.isPayment === true || item.status === 'success' ? (
                          <b style={{ color: 'green' }}>paid</b>
                        ) : (
                          <b style={{ color: '#f0932b' }}>unpaid</b>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {dateFormat(item.timeReceive, 'hh:MM TT')}
                        <br />
                        {dateFormat(item.timeReceive, 'dd/mm/yyyy')}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          disabled={item.status !== 'pending' && true}
                          size="small"
                          variant="contained"
                          onClick={() => handleOpenCancelOrderConfirm(item.id)}
                          color="secondary"
                        >
                          Cancel Oder
                        </Button>
                        <Button
                          size="small"
                          disabled={item.status !== 'success' && true}
                          variant="contained"
                          onClick={() => handleOPenRatingOrder(item.id)}
                          style={{ marginLeft: '20px' }}
                          color="primary"
                        >
                          Rating
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
              )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* cancel order feature */}
      <PopUpConfirm
        isConfirmOpen={isConfirmOpen}
        dialogTitle="Confirm Cancel Order"
        dialogContent="Are you sure want to cancel this order"
        handleConfirmClose={handleConfirmClose}
        onConfirmSubmit={onConfirmSubmit}
      />

      {/* rating order feature */}
      <PopupRating
        isRatingOpen={isRatingOpen}
        handleRatingClose={handleRatingClose}
        onSubmit={handleRatingSubmit}
      />
    </Box>
  );
};
export default OrderHistory;
