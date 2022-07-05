import {
  Box,
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
import { useDispatch } from 'react-redux';
import TitleAdminStorePage from '../../../../components/common/TitleAdminStorePage/TitleAdminStorePage';
import { getListStoreOrder } from '../../../store/storeSlice';
import './listOrder.scss';

export default function ListOrder() {
  const dispatch = useDispatch();

  const [isDataChange, setIsDataChange] = useState(false);
  const [listStoreOrder, setListStoreOrder] = useState(null);

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
    fetchGetListStoreOrder();
  }, [dispatch, isDataChange]);

  return (
    <div className="listOrderWrapper listSaleCodeWrapper">
      <Box className="headerListSaleCode">
        <TitleAdminStorePage title="List Order" />
        {/* <Button
          variant="contained"
          endIcon={<AddIcon />}
          // onClick={handleAddUpdateSaleCodeOpen}
        >
          Add
        </Button> */}
      </Box>
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead style={{ background: '#3dbe9c', color: '#fff' }}>
              <TableRow>
                <TableCell className="tableHeaderItem" align="center">
                  Name
                </TableCell>
                <TableCell className="tableHeaderItem" align="center">
                  Discount Percent
                </TableCell>

                <TableCell className="tableHeaderItem" align="center">
                  Status
                </TableCell>
                <TableCell className="tableHeaderItem" align="center">
                  Used Time
                </TableCell>
                <TableCell className="tableHeaderItem" align="center">
                  Expire Time
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
              {/* {listSaleCode ? (
                listSaleCode.map((saleCode) => (
                  <TableRow
                    key={saleCode.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="center">{saleCode.name}</TableCell>
                    <TableCell align="center">{saleCode.discountPercent}%</TableCell>
                    <TableCell align="center">{saleCode.status}</TableCell>
                    <TableCell align="center">
                      {moment(saleCode.start).format('DD MMM YYYY')}
                    </TableCell>
                    <TableCell align="center">
                      {moment(saleCode.end).format('DD MMM YYYY')}
                    </TableCell>
                    <TableCell align="center">
                      {moment(saleCode.createdAt).format('DD MMM YYYY')}
                    </TableCell>
                    <TableCell align="center">
                      {moment(saleCode.updatedAt).format('DD MMM YYYY')}
                    </TableCell>
                    <TableCell align="center">
                      <Box>
                        <Button
                          variant="text"
                          size="small"
                          style={{ margin: 'auto 10px' }}
                          color="secondary"
                          onClick={(e) => handleConfirmOpen(saleCode.name, saleCode.id)}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="text"
                          size="small"
                          style={{ margin: 'auto 10px' }}
                          color="primary"
                          onClick={(e) => handleClickUpdateSaleCode(saleCode.id, saleCode)}
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
                  <p>Don`t have any order yet!</p>
                </TableCell>
              </TableRow>
              {/* )} */}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}
