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
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import TitleAdminStorePage from '../../../../components/common/TitleAdminStorePage/TitleAdminStorePage';
import './listProduct.scss';
import { getOwnerProducts } from '../../productSlice.js';

export default function ListProduct() {
  const dispatch = useDispatch();

  const [ownerProducts, setOwnerProducts] = useState(null);

  // get list product created by specific store
  useEffect(() => {
    const fetchGetOwnerProducts = async () => {
      try {
        const result = await dispatch(getOwnerProducts());
        unwrapResult(result);

        setOwnerProducts(result.payload.data);
      } catch (error) {
        console.log('Get list product error: ', error);
      }
    };
    fetchGetOwnerProducts();
  }, []);

  console.log(ownerProducts);

  return (
    <Box className="listProductWrapper">
      <Box className="headerListCategory">
        <TitleAdminStorePage list title="List Product" />
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
                  Image
                </TableCell>
                <TableCell className="tableHeaderItem" align="center">
                  Name Category
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
              {/* {listCategory ? (
                listCategory.map((category) => (
                  <TableRow
                    key={category.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="center" component="th" scope="row">
                      <img src={category.image} width="45" height="45" alt="category" />
                    </TableCell>
                    <TableCell align="center">{category.name}</TableCell>
                    <TableCell align="center">
                      {moment(category.createdAt).format('DD MMM YYYY')}
                    </TableCell>
                    <TableCell align="center">
                      {moment(category.updatedAt).format('DD MMM YYYY')}
                    </TableCell>
                    <TableCell align="center">
                      <Box>
                        <Button
                          variant="text"
                          size="small"
                          style={{ margin: 'auto 10px' }}
                          color="secondary"
                          onClick={(e) => handleConfirmOpen(category.name, category.id)}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="text"
                          size="small"
                          style={{ margin: 'auto 10px' }}
                          color="primary"
                          onClick={(e) => handleClickUpdateCategory(category.id, category)}
                        >
                          Update
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : ( */}
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="center">
                  <p>Don`t have any product yet!</p>
                </TableCell>
              </TableRow>
              {/* )} */}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
