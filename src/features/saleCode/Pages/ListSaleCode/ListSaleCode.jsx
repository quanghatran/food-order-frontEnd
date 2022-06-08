import AddIcon from '@mui/icons-material/Add';
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
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import PopUpConfirm from '../../../../components/common/PopUpConfirm/PopUpConfirm';
import TitleAdminStorePage from '../../../../components/common/TitleAdminStorePage/TitleAdminStorePage';
import AddUpdateSaleCode from '../../components/AddUpdateSaleCodeForm';
import { addSaleCode, deleteSaleCode, getListSaleCode } from '../../saleCodeSlice';
import './listSaleCode.scss';

export default function ListSaleCode() {
  const dispatch = useDispatch();

  const [listSaleCode, setListSaleCode] = useState(null);
  const [isDataChange, setIsDataChange] = useState(false);
  const [isAddUpdateSaleCodeOpen, setIsAddUpdateSaleCodeOpen] = useState(false);
  const [idSaleCode, setIdSaleCode] = useState(null);
  const [saleCodeInfo, setSaleCodeInfo] = useState(null);
  const [nameConfirm, setNameConfirm] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // get initial list sale code
  useEffect(() => {
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
  }, [isDataChange]);

  // handle add update sale code
  const handleAddUpdateSaleCodeSubmit = async (dataSubmit) => {
    if (!idSaleCode) {
      // add new sale code
      try {
        const result = await dispatch(addSaleCode(dataSubmit));
        unwrapResult(result);

        setIsDataChange(!isDataChange);
        setIsAddUpdateSaleCodeOpen(false);
        toast.success('Add sale code success!');
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      // update new sale code
      console.log('update sale code');
    }
  };

  const handleAddUpdateSaleCodeOpen = () => {
    setIsAddUpdateSaleCodeOpen(true);
    // setSaleCodeInfo()
  };

  const handleAddUpdateSaleCodeClose = () => {
    setIsAddUpdateSaleCodeOpen(false);
    setIdSaleCode(null);
    setSaleCodeInfo(null);
  };

  const handleConfirmOpen = (nameConfirm, idSaleCode) => {
    setNameConfirm(nameConfirm);
    setIsConfirmOpen(true);
    setIdSaleCode(idSaleCode);
  };

  const handleConfirmClose = () => {
    setIsConfirmOpen(false);
    setNameConfirm(null);
    setIdSaleCode(null);
  };

  // handle delete sale code by id
  const onConfirmSubmit = async () => {
    try {
      await dispatch(deleteSaleCode(idSaleCode));
      setIsDataChange(!isDataChange);
      toast.success('Delete category success!');
    } catch (error) {
      toast.error('Delete category failed!');
      console.log(error);
    }
    setIsConfirmOpen(false);
  };

  const handleClickUpdateSaleCode = (idSaleCode, saleCodeInfo) => {
    console.log(idSaleCode);
    console.log(saleCodeInfo);
    if (idSaleCode) {
      setIdSaleCode(idSaleCode);
      setSaleCodeInfo(saleCodeInfo);
      setIsAddUpdateSaleCodeOpen(true);
    }
  };

  return (
    <Box className="listSaleCodeWrapper">
      <Box className="headerListSaleCode">
        <TitleAdminStorePage title="List Sale Code" />
        <Button variant="contained" endIcon={<AddIcon />} onClick={handleAddUpdateSaleCodeOpen}>
          Add
        </Button>
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
              {listSaleCode ? (
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
              ) : (
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="center">
                    <p>Don`t have any sale code yet!</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* popup add update sale code */}
        <AddUpdateSaleCode
          idSaleCode={idSaleCode}
          isAddUpdateSaleCodeOpen={isAddUpdateSaleCodeOpen}
          handleAddUpdateSaleCodeClose={handleAddUpdateSaleCodeClose}
          onFormSubmit={handleAddUpdateSaleCodeSubmit}
          saleCodeInfo={saleCodeInfo}
        />

        {/* popup confirm delete a sale code */}
        <PopUpConfirm
          dialogTitle="Confirm delete sale code"
          dialogContent="Are you sure want to delete"
          nameConfirm={nameConfirm}
          isConfirmOpen={isConfirmOpen}
          handleConfirmClose={handleConfirmClose}
          onConfirmSubmit={onConfirmSubmit}
        />
      </Box>
    </Box>
  );
}
