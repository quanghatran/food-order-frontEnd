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
  const [listStore, setListStore] = useState(null);

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
  }, []);

  // get all products in system
  useEffect(() => {
    const fetchGetListProduct = async () => {
      try {
        const result = await dispatch(getListProduct());
        unwrapResult(result);

        setListProduct(result.payload.data);
      } catch (error) {
        console.log('Get list product error: ', error);
      }
    };
    fetchGetListProduct();
  }, []);

  console.log(listStore);

  return (
    <Box className="listProductWrapper listCategoryWrapper listUserWrapper">
      <Box className="headerListCategory">
        <TitleAdminStorePage list title="Product Manager" />
        <Button variant="contained" endIcon={<AddIcon />}>
          <Link style={{ color: '#fff', textDecoration: 'none' }} to="/store/products/add">
            Add
          </Link>
        </Button>
      </Box>
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead style={{ background: '#3dbe9c', color: '#fff' }}>
              <TableRow>
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
                listProduct.map((product) => (
                  <TableRow
                    key={product.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="center" component="th" scope="row">
                      <Box className="userDetail">
                        <img src={product.images[0]} width="55" height="55" alt="product" />
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
                              />{' '}
                              vnđ
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
                    <TableCell align="left" style={{ maxWidth: '200px' }}>
                      {product.description}
                    </TableCell>
                    <TableCell align="center">{product.boughtNum}</TableCell>
                    <TableCell align="center">
                      {product.storeId}

                      {/* {listStore.find((store) => {
                        if (store === product.storeId) {
                          console.log(store.name);
                          return store.name;
                        }
                      })} */}
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
                          variant="text"
                          size="small"
                          style={{ margin: 'auto 10px' }}
                          color="secondary"
                          // onClick={(e) => handleConfirmOpen(product.name, product.id)}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="text"
                          size="small"
                          style={{ margin: 'auto 10px' }}
                          color="primary"
                          // onClick={(e) => handleClickUpdateCategory(category.id, category)}
                        >
                          Update
                        </Button>
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
      </Box>
    </Box>
  );
}
