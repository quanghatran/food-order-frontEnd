import {
  Box,
  Button,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { useDispatch } from 'react-redux';
import TitleAdminStorePage from '../../../../components/common/TitleAdminStorePage/TitleAdminStorePage';
import { getAllOrderFeatrure } from '../../adminSlice';
import dateFormat from 'dateformat';
import './orderManager.scss';
import PopupShowsProducts from '../../../order/components/PopupShowsProducts/PopupShowsProducts';
import { getProductsOrder, getRatingOrder } from '../../../store/storeSlice';
import PopupRatingOrder from '../../../order/components/PopupRatingOrder/PopupRatingOrder';

export default function OrderManager() {
  const dispatch = useDispatch();

  const [listOrder, setListOrder] = useState(null);
  const [params, setParams] = useState({ pagenumber: 1, pagesize: 100 });
  const [totalOrders, setTotalOrders] = useState(0);
  const [isPopupShowsProductsOpen, setIsPopupShowsProductsOpen] = useState(false);
  const [productsOrder, setProductOrders] = useState(null);
  const [ratingOrder, setRatingOrder] = useState(null);
  const [isRatingOrder, setIsRatingOrder] = useState(false);

  // get list store order
  useEffect(() => {
    const fetchGetListOrder = async () => {
      try {
        const result = await dispatch(getAllOrderFeatrure(params));
        unwrapResult(result);
        setListOrder(result.payload.orders);
        setTotalOrders(Object.keys(result.payload.orders).length);
      } catch (error) {
        console.log('Get list order error: ', error);
      }
    };

    fetchGetListOrder();
  }, [params, dispatch]);

  const handlePaginationChange = (event, value) => {
    setParams({ ...params, pagenumber: value });
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

  const findTimeReceive = (time, status) => {
    return (
      <span>
        {dateFormat(time, 'hh:MM TT')}
        <br />
        {dateFormat(time, 'dd/mm/yyyy')}
      </span>
    );
  };

  const handleClosePopupProducts = () => {
    setIsPopupShowsProductsOpen(false);
    setProductOrders(null);
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

  console.log(listOrder);

  return (
    <Box className="orderManagerAdminWrapper listCategoryWrapper listUserWrapper">
      <Box className="headerListCategory">
        <TitleAdminStorePage title="Orders Manager" />
      </Box>
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead style={{ background: '#3dbe9c', color: '#fff' }}>
              <TableRow>
                {/* <TableCell className="tableHeaderItem" align="center">
                  STT
                </TableCell> */}
                <TableCell className="tableHeaderItem" align="center">
                  Store ower
                </TableCell>
                <TableCell className="tableHeaderItem" align="center">
                  User
                </TableCell>
                <TableCell className="tableHeaderItem" align="center">
                  Status
                </TableCell>
                <TableCell className="tableHeaderItem" align="center">
                  Payment
                </TableCell>
                <TableCell className="tableHeaderItem" align="center">
                  Payment Type
                </TableCell>
                <TableCell className="tableHeaderItem" align="center">
                  Total Price
                </TableCell>
                <TableCell className="tableHeaderItem" align="center">
                  Time Receive
                </TableCell>
                <TableCell className="tableHeaderItem" align="center">
                  Discount
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
              {listOrder ? (
                listOrder.map(
                  (order, index) =>
                    order.total_price > 0 && (
                      <TableRow
                        key={order.order_id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        {/* <TableCell align="center">{index + 1}</TableCell> */}
                        <TableCell align="center">{order.store_name}</TableCell>
                        <TableCell align="center">{order.user_name}</TableCell>
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
                          {order.is_payment === true || order.status === 'success' ? (
                            <b style={{ color: 'green' }}>paid</b>
                          ) : (
                            <b style={{ color: '#f0932b' }}>unpaid</b>
                          )}
                        </TableCell>
                        <TableCell align="center">{order.payment_type}</TableCell>
                        <TableCell align="center">
                          <CurrencyFormat
                            value={order.total_price}
                            displayType={'text'}
                            thousandSeparator={true}
                          />
                          đ
                        </TableCell>
                        <TableCell align="center">
                          {findTimeReceive(order.time_receive, order.status)}
                        </TableCell>

                        <TableCell align="center">{order.discount_name}</TableCell>

                        <TableCell align="center">
                          {dateFormat(order.createdAt, 'hh:MM TT')}
                          <br />
                          {dateFormat(order.createdAt, 'dd/mm/yyyy')}
                        </TableCell>
                        <TableCell align="center">
                          {dateFormat(order.updatedAt, 'hh:MM TT')}
                          <br />
                          {dateFormat(order.updatedAt, 'dd/mm/yyyy')}
                        </TableCell>

                        <TableCell align="left">
                          <Box>
                            <Button
                              variant="outlined"
                              size="small"
                              style={{ margin: 'auto 10px' }}
                              color="primary"
                              onClick={(e) => handleOpenProductsOrder(order.order_id)}
                            >
                              Detail
                            </Button>

                            <Button
                              variant="outlined"
                              size="small"
                              style={{ margin: 'auto 10px' }}
                              color="success"
                              disabled={order.status !== 'success'}
                              onClick={(e) => handleOpenRatingOrder(order.order_id)}
                            >
                              Rating
                            </Button>
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
        <Box className="paginationBox">
          <Pagination
            count={Math.ceil(totalOrders / 10)}
            shape="rounded"
            color="primary"
            onChange={handlePaginationChange}
          />
          <PopupRatingOrder
            isRatingOrder={isRatingOrder}
            handleCloseRatingOrder={handleCloseRatingOrder}
            dataRatingOrder={ratingOrder}
          />
          <PopupShowsProducts
            isPopupShowsProductsOpen={isPopupShowsProductsOpen}
            handleClosePopupProducts={handleClosePopupProducts}
            dataListProduct={productsOrder}
          />
        </Box>
      </Box>
    </Box>
  );
}
