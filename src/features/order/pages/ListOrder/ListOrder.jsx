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
import TitleAdminStorePage from '../../../../components/common/TitleAdminStorePage/TitleAdminStorePage';
import { getListSaleCode } from '../../../saleCode/saleCodeSlice';
import {
  getListStoreOrder,
  getOrderById,
  getProductsOrder,
  getRatingOrder,
  storeUpdateOrder,
} from '../../../store/storeSlice';
import PopupRatingOrder from '../../components/PopupRatingOrder/PopupRatingOrder';
import PopupShowsProducts from '../../components/PopupShowsProducts/PopupShowsProducts';
import PopupUpdateOrder from '../../components/PopupUpdateOrder/PopupUpdateOrder';
import './listOrder.scss';

export default function ListOrder() {
  const dispatch = useDispatch();

  const [listStoreOrder, setListStoreOrder] = useState(null);
  const [listSaleCode, setListSaleCode] = useState(null);
  const [listDetailOrder, setListDetailOrder] = useState([]);
  const [orderId, setOrderId] = useState('');
  const [isUpdateOrderOpen, setIsUpdateOrderOpen] = useState(false);
  const [isPopupShowsProductsOpen, setIsPopupShowsProductsOpen] = useState(false);
  const [isRatingOrder, setIsRatingOrder] = useState(false);
  const [orderStatus, setOrderStatus] = useState('');
  const [isDataChange, setIsDataChange] = useState(false);
  const [productsOrder, setProductOrders] = useState(null);
  const [ratingOrder, setRatingOrder] = useState(null);

  // get list store order
  useEffect(() => {
    const fetchGetListStoreOrder = async () => {
      const params = {
        page: 1,
        perPage: 100,
      };
      try {
        const result = await dispatch(getListStoreOrder(params));
        unwrapResult(result);
        setListStoreOrder(result.payload);
      } catch (error) {
        console.log('Get list store order error: ', error);
      }
    };

    const fetchGetListSaleCode = async () => {
      try {
        const result = await dispatch(getListSaleCode());
        unwrapResult(result);
        setListSaleCode(result.payload);
      } catch (error) {
        console.log('Get list sale code error: ', error);
      }
    };

    fetchGetListSaleCode();
    fetchGetListStoreOrder();
  }, [dispatch, isDataChange]);

  useEffect(() => {
    if (listStoreOrder) {
      listStoreOrder.map((order) => {
        const fetchGetOrderById = async () => {
          try {
            const result = await dispatch(getOrderById(order.id));
            unwrapResult(result);
            setListDetailOrder(...listDetailOrder, result.payload[0]);
          } catch (error) {
            console.log('Get store order failed: ', error);
          }
        };

        fetchGetOrderById();
      });
    }
  }, [dispatch, listStoreOrder, isDataChange]);

  const findSaleCode = (idSaleCode) => {
    if (idSaleCode && listSaleCode) {
      const saleCode = listSaleCode?.find((saleCode) => saleCode.id === idSaleCode);
      return `${saleCode.name} (${saleCode.discountPercent}%)`;
    }
  };

  const findTimeReceive = (time, status) => {
    return (
      <span>
        {dateFormat(time, 'hh:MM TT')}
        <br />
        {dateFormat(time, 'dd/mm/yyyy')}
      </span>
    );
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

  const handleOpenUpdateOrder = (orderId, orderStatus) => {
    setOrderId(orderId);
    setIsUpdateOrderOpen(true);
    setOrderStatus(orderStatus);
  };

  const handleUpdateOrderClose = () => {
    setOrderId('');
    setIsUpdateOrderOpen(false);
    setOrderStatus('');
  };

  const handleClosePopupProducts = () => {
    setIsPopupShowsProductsOpen(false);
    setProductOrders(null);
  };

  const handleSubmitUpdateOrder = async (status) => {
    if (orderId && status) {
      try {
        const resultUpdateOrder = await dispatch(storeUpdateOrder({ orderId, status }));
        unwrapResult(resultUpdateOrder);
        toast.success('Update order success');

        setIsDataChange(!isDataChange);
      } catch (error) {
        toast.error(`Update order failed`);
      }
    } else {
      toast.error(`Update order failed`);
    }
    setOrderId('');
    setIsUpdateOrderOpen(false);
  };

  const handleOpenProductsOrder = async (idOrder) => {
    if (idOrder) {
      setIsPopupShowsProductsOpen(true);
      try {
        const resultProductsOrder = await dispatch(getProductsOrder(idOrder));
        unwrapResult(resultProductsOrder);
        setProductOrders(resultProductsOrder.payload);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCloseRatingOrder = () => {
    setIsRatingOrder(false);
    setRatingOrder(null);
  };

  const handleOpenRatingOrder = async (idOrder) => {
    if (idOrder) {
      setIsRatingOrder(true);
      try {
        const resultRatingOrder = await dispatch(getRatingOrder(idOrder));
        unwrapResult(resultRatingOrder);
        setRatingOrder(resultRatingOrder.payload);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="listOrderWrapper listSaleCodeWrapper">
      <Box className="headerListSaleCode">
        <TitleAdminStorePage title="List Order" />
      </Box>
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead style={{ background: '#3dbe9c', color: '#fff' }}>
              <TableRow>
                <TableCell className="tableHeaderItem" align="center">
                  STT
                </TableCell>
                <TableCell className="tableHeaderItem" align="center">
                  User ID
                </TableCell>
                <TableCell className="tableHeaderItem" align="center">
                  Time Receive
                </TableCell>
                <TableCell className="tableHeaderItem" align="center">
                  Status
                </TableCell>
                <TableCell className="tableHeaderItem" align="center">
                  Total Price
                </TableCell>
                <TableCell className="tableHeaderItem" align="center">
                  Discount
                </TableCell>
                <TableCell className="tableHeaderItem" align="center">
                  Payment
                </TableCell>
                <TableCell className="tableHeaderItem" align="center">
                  Payment Type
                </TableCell>
                <TableCell className="tableHeaderItem" align="center">
                  Created TIme
                </TableCell>
                <TableCell className="tableHeaderItem" align="center">
                  Updated Time
                </TableCell>
                <TableCell className="tableHeaderItem" align="center">
                  Modify
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listStoreOrder ? (
                listStoreOrder.map(
                  (order, index) =>
                    order.totalPrice > 0 && (
                      <TableRow
                        key={order.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">{order.userId.slice(-6)}</TableCell>
                        <TableCell align="center">
                          {findTimeReceive(order.timeReceive, order.status)}
                        </TableCell>
                        <TableCell align="center">
                          <b
                            style={{
                              color: `${checkStatusColor(order.status)}`,
                            }}
                          >
                            {order.status}
                          </b>
                        </TableCell>
                        <TableCell align="center">
                          <CurrencyFormat
                            value={order.totalPrice}
                            displayType={'text'}
                            thousandSeparator={true}
                          />
                          đ
                        </TableCell>
                        <TableCell align="center">{findSaleCode(order.discountId)}</TableCell>
                        <TableCell align="center">
                          {order.isPayment === true || order.status === 'success' ? (
                            <b style={{ color: 'green' }}>paid</b>
                          ) : (
                            <b style={{ color: '#f0932b' }}>unpaid</b>
                          )}
                        </TableCell>
                        <TableCell align="center">{order.paymentType}</TableCell>

                        <TableCell align="center">
                          {dateFormat(order.createdAt, 'hh:MM TT')}
                          <br />
                          {dateFormat(order.createdAt, 'dd/mm/yyyy')}
                        </TableCell>
                        <TableCell align="center">
                          {dateFormat(order.updatedAt, 'hh:MM TT')}
                          <br />
                          {dateFormat(order.updatedAt, 'dd/mm/yyyy')}
                          List Order{' '}
                        </TableCell>

                        <TableCell align="center">
                          <Box>
                            <Button
                              variant="outlined"
                              size="small"
                              style={{ margin: 'auto 10px' }}
                              color="primary"
                              onClick={(e) => handleOpenProductsOrder(order.id)}
                            >
                              Detail
                            </Button>
                            {(order.status === 'pending' || order.status === 'confirm') && (
                              <Button
                                variant="outlined"
                                size="small"
                                style={{ margin: 'auto 10px' }}
                                color="primary"
                                onClick={(e) => handleOpenUpdateOrder(order.id, order.status)}
                              >
                                Update
                              </Button>
                            )}
                            {order.status === 'success' && (
                              <Button
                                variant="outlined"
                                size="small"
                                style={{ margin: 'auto 10px' }}
                                color="success"
                                onClick={(e) => handleOpenRatingOrder(order.id)}
                              >
                                Rating
                              </Button>
                            )}
                          </Box>
                        </TableCell>
                      </TableRow>
                    )
                )
              ) : (
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="center">
                    <p>Don`t have any order yet!</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <PopupUpdateOrder
          isUpdateOrderOpen={isUpdateOrderOpen}
          orderStatus={orderStatus}
          handleUpdateOrderClose={handleUpdateOrderClose}
          onSubmit={handleSubmitUpdateOrder}
        />

        <PopupShowsProducts
          isPopupShowsProductsOpen={isPopupShowsProductsOpen}
          handleClosePopupProducts={handleClosePopupProducts}
          dataListProduct={productsOrder}
        />

        <PopupRatingOrder
          isRatingOrder={isRatingOrder}
          handleCloseRatingOrder={handleCloseRatingOrder}
          dataRatingOrder={ratingOrder}
        />
      </Box>
    </div>
  );
}
