import {
  Box,
  Button,
  Paper,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import dateFormat from 'dateformat';
import React, { useEffect } from 'react';
import { useState } from 'react';
import userApi from '../../../../api/userApi';
import TitleUserPage from '../../../../components/common/TitleUserPage/TitleUserPage';
import './orderHistory.scss';

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState(null);
  const userInfo = JSON.parse(localStorage.getItem('accountInfo'));
  useEffect(() => {
    (async () => {
      const response = await userApi.getHistoryOrder();
      setOrderHistory(response);
    })();
  }, []);

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
                Rating
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
            </TableRow>
          </TableHead>
          <TableBody>
            {orderHistory &&
              orderHistory.map((item) => (
                <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
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
                  <TableCell align="center">
                    <Rating
                      size="small"
                      style={{ marginTop: '10px' }}
                      name="half-rating-read"
                      defaultValue={item.star}
                      precision={0.5}
                      readOnly
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Box className="phoneNumber">
                      {item.status === 'active' ? (
                        <b style={{ color: 'green' }}>{item.status}</b>
                      ) : (
                        <b style={{ color: '#f0932b' }}>{item.status}</b>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell align="center">{item.totalPrice}</TableCell>
                  <TableCell align="center">{item.paymentType}</TableCell>
                  <TableCell align="center">
                    {item.isPayment === true ? 'paid' : 'unpaid'}
                  </TableCell>
                  <TableCell align="center">{dateFormat(item.timeReceive, 'dd/mm/yyyy')}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default OrderHistory;
