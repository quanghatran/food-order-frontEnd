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
import CurrencyFormat from 'react-currency-format';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import PopUpConfirm from '../../../../components/common/PopUpConfirm/PopUpConfirm';
import TitleAdminStorePage from '../../../../components/common/TitleAdminStorePage/TitleAdminStorePage';
import { deleteProduct, getListProduct } from '../../productSlice.js';
import './listProduct.scss';

export default function ListProduct() {
  const dispatch = useDispatch();

  const storeInfo = JSON.parse(localStorage.getItem('account'));
  const [params, setParams] = useState({ page: 1, perPage: 10 });
  const [listProduct, setListProduct] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [nameConfirm, setNameConfirm] = useState(null);
  const [idConfirm, setIdConfirm] = useState(null);

  useEffect(() => {
    const fetchGetListProduct = async () => {
      try {
        const result = await dispatch(getListProduct({ params }));
        unwrapResult(result);

        const listAllProduct = result.payload.data;

        if (listAllProduct && storeInfo.id) {
          const ownerProducts = listAllProduct.filter(
            (product) => product.storeId === storeInfo.id
          );
          setListProduct(ownerProducts);
        }
      } catch (error) {
        console.log('Get list product error: ', error);
      }
    };
    fetchGetListProduct();
  }, [storeInfo.id, params]);

  const handleUpdateProduct = (idProduct) => {
    console.log('update product: ', idProduct);
  };

  const handleDeleteProduct = async () => {
    console.log(idConfirm);
    try {
      const resultDeleteProduct = await dispatch(deleteProduct(idConfirm));
      unwrapResult(resultDeleteProduct);
      console.log(resultDeleteProduct);
      toast.success('Delete product success');
    } catch (error) {
      toast.error(`Delete product failed`);
    }
  };

  const handleConfirmOpen = (nameConfirm, idConfirm) => {
    setNameConfirm(nameConfirm);
    setIsConfirmOpen(true);
    setIdConfirm(idConfirm);
  };

  const handleConfirmClose = () => {
    setIsConfirmOpen(false);
    setNameConfirm(null);
  };

  return (
    <Box className="listProductWrapper listCategoryWrapper listUserWrapper">
      <Box className="headerListCategory">
        <TitleAdminStorePage list title="List Product" />
        <Button variant="contained" endIcon={<AddIcon />}>
          <Link style={{ color: '#fff', textDecoration: 'none' }} to="/store/products/add">
            Add
          </Link>
        </Button>
      </Box>
      <Box style={{ marginBottom: '30px' }}>
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
                      <TableCell style={{ fontWeight: '500' }} align="center">
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
                            // onClick={(e) => handleDeleteProduct(product.id)}
                            onClick={(e) => handleConfirmOpen(product.name, product.id)}
                          >
                            Delete
                          </Button>
                          <Button
                            variant="text"
                            size="small"
                            style={{ margin: 'auto 10px' }}
                            color="primary"
                            onClick={(e) => handleUpdateProduct(product.id)}
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
          {/* <Box className="paginationBox">
            <Pagination
              count={Math.ceil(totalProduct / params.perPage)}
              shape="rounded"
              color="primary"
              onChange={handlePaginationChange}
            />
          </Box> */}
          {/* popup confirm delete a category */}
          <PopUpConfirm
            dialogTitle="Confirm delete product?"
            dialogContent="Are you sure want to delete"
            nameConfirm={nameConfirm}
            isConfirmOpen={isConfirmOpen}
            handleConfirmClose={handleConfirmClose}
            onConfirmSubmit={handleDeleteProduct}
          />
        </Box>
      </Box>
    </Box>
  );
}
