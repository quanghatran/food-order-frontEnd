import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import { unwrapResult } from '@reduxjs/toolkit';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import TitleAdminStorePage from '../../../../components/common/TitleAdminStorePage/TitleAdminStorePage';
import { getListProduct } from '../../../products/productSlice';
import CurrencyFormat from 'react-currency-format';
import { getAllStore } from '../../../storeManager/storeManagerSlice';

export default function ProductManager() {
  const dispatch = useDispatch();

  const [listProduct, setListProduct] = useState(null);
  const [totalProduct, setTotalProduct] = useState(0);
  const [params, setParams] = useState({ page: 1, perPage: 8 });
  const [listStore, setListStore] = useState(null);
  const [isDataChange, setIsDataChange] = useState(false);

  // get all store
  useEffect(() => {
    const fetchGetListStore = async () => {
      try {
        const result = await dispatch(getAllStore());
        unwrapResult(result);

        setListStore(result.payload);
      } catch (error) {
        console.log('Get list product error: ', error);
      }
    };
    fetchGetListStore();

    // get all products in system
    const fetchGetListProduct = async () => {
      try {
        const result = await dispatch(getListProduct(params));
        unwrapResult(result);
        setTotalProduct(result.payload.count);
        setListProduct(result.payload.data);
      } catch (error) {
        console.log('Get list product error: ', error);
      }
    };
    fetchGetListProduct();
  }, [totalProduct, params, isDataChange]);

  const handlePaginationChange = (event, value) => {
    setParams({ ...params, page: value });
  };

  const checkNameStore = (idProduct) => {
    if (idProduct && listStore) {
      const store = listStore.find((store) => store.id === idProduct);
      return store.name;
    }
  };

  return (
    <Box className="listProductWrapper listCategoryWrapper listUserWrapper">
      <Box className="headerListCategory">
        <TitleAdminStorePage list title="Product Manager" />
        {/* <Button variant="contained" endIcon={<AddIcon />}>
          <Link style={{ color: '#fff', textDecoration: 'none' }} to="/store/products/add">
            Add
          </Link>
        </Button> */}
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
                  Basic Information
                </TableCell>
                <TableCell className="tableHeaderItem" align="center">
                  Description
                </TableCell>
                <TableCell className="tableHeaderItem" align="center">
                  Quantity Bought
                </TableCell>
                <TableCell className="tableHeaderItem" align="center">
                  Store Name
                </TableCell>
                <TableCell className="tableHeaderItem" align="center">
                  Created At
                </TableCell>
                <TableCell className="tableHeaderItem" align="center">
                  Updated At
                </TableCell>
                <TableCell className="tableHeaderItem" align="center">
                  Modify
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listProduct ? (
                listProduct.map((product, index) => (
                  <TableRow
                    key={product.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell
                      style={{ color: '#000', fontWeight: '500' }}
                      className="tableHeaderItem"
                      align="center"
                    >
                      {index + 1}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      <Box className="userDetail">
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
                        <div className="userDetailBox">
                          <div className="name">
                            <b style={{ fontSize: '18px' }}>{product.name}</b>
                          </div>
                          <div className="email">
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
                          <div className="phoneNumber">
                            Status:{' '}
                            {product.status === 'active' ? (
                              <b style={{ color: 'green' }}>{product.status}</b>
                            ) : (
                              <b style={{ color: 'red' }}>{product.status}</b>
                            )}
                          </div>
                        </div>
                      </Box>
                    </TableCell>
                    <TableCell align="left" style={{ maxWidth: '500px', fontSize: '13px' }}>
                      {product.description}
                    </TableCell>
                    <TableCell align="center">{product.boughtNum}</TableCell>
                    <TableCell align="center">
                      {/* {product.storeId} */}
                      <span>{checkNameStore(product.storeId)}</span>
                    </TableCell>
                    <TableCell align="center">
                      {moment(product.createdAt).format('DD MMM YYYY')}
                    </TableCell>
                    <TableCell align="center">
                      {moment(product.updatedAt).format('DD MMM YYYY')}
                    </TableCell>
                    <TableCell align="center">
                      <Box>
                        <Button
                          variant="outlined"
                          size="small"
                          style={{ margin: 'auto 10px' }}
                          color="secondary"
                          // onClick={(e) => handleConfirmOpen(product.name, product.id)}
                        >
                          Delete
                        </Button>
                        {/* <Button
                          variant="text"
                          size="small"
                          style={{ margin: 'auto 10px' }}
                          color="primary"
                          // onClick={(e) => handleClickUpdateCategory(category.id, category)}
                        >
                          Update
                        </Button> */}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="center">
                    <p>Don`t have any product yet!</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box className="paginationBox" style={{ marginBottom: '30px' }}>
          <Pagination
            count={Math.ceil(totalProduct / params.perPage)}
            shape="rounded"
            color="primary"
            onChange={handlePaginationChange}
          />
        </Box>
      </Box>
    </Box>
  );
}
