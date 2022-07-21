import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteUser, getAllUsers } from '../../userManagerSlice';
import '../../../categories/pages/ListCategory/listCategory.scss';
import AddIcon from '@mui/icons-material/Add';
import { Button, Pagination } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/system';
import moment from 'moment';
import { toast } from 'react-toastify';
import TitleAdminStorePage from '../../../../components/common/TitleAdminStorePage/TitleAdminStorePage';
import './listUserManager.scss';
import PopUpConfirm from '../../../../components/common/PopUpConfirm/PopUpConfirm';

export default function ListUserManager() {
  const dispatch = useDispatch();

  const [listUsers, setListUsers] = useState(null);
  const [params, setParams] = useState({ page: 1, perPage: 8 });
  const [totalUser, setTotalUser] = useState(0);
  const [nameConfirm, setNameConfirm] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [idConfirm, setIdConfirm] = useState(null);
  const [isDataChange, setIsDataChange] = useState(false);

  // get list user
  useEffect(() => {
    const fetchGetAllUsers = async () => {
      try {
        const users = await dispatch(getAllUsers({ params }));
        unwrapResult(users);
        setTotalUser(users.payload.count);
        setListUsers(users.payload.data);
      } catch (error) {
        console.log('Get list category error: ', error);
      }
    };

    fetchGetAllUsers();
  }, [params, isDataChange]);

  const handlePaginationChange = (event, value) => {
    setParams({ ...params, page: value });
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

  // handle remove user by id
  const handleClickRemoveUser = async (idUser) => {
    try {
      await dispatch(deleteUser(idUser));
      setIsDataChange(!isDataChange);
      toast.success('Delete user success!');
    } catch (error) {
      toast.error('Delete user failed!');
      console.log(error);
    }
  };

  const onConfirmSubmit = () => {
    handleClickRemoveUser(idConfirm);
    setIsConfirmOpen(false);
  };

  return (
    <Box className="listCategoryWrapper listUserWrapper">
      <Box className="headerListCategory">
        <TitleAdminStorePage title="User Manager" />
        {/* <Button
          variant="contained"
          endIcon={<AddIcon />}
          // onClick={handleAddUpdateCategoryOpen}
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
                  Basic Information
                </TableCell>
                <TableCell className="tableHeaderItem" align="center">
                  Address
                </TableCell>

                <TableCell className="tableHeaderItem" align="center">
                  Verify Email
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
              {listUsers ? (
                listUsers.map((user) => (
                  <TableRow
                    key={user.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="center" component="th" scope="row">
                      <Box className="userDetail">
                        <img
                          className="userImage"
                          src={user.avatar}
                          alt="user"
                          style={{
                            objectFit: 'cover',
                            borderRadius: '50%',
                            boxShadow: '0 0.5rem 1rem rgb(0 0 0 / 15%)',
                          }}
                          width="90"
                          height="90"
                        />
                        <div className="userDetailBox">
                          <div className="name">
                            <b style={{ fontSize: '18px' }}>{user.name}</b>
                          </div>
                          <div className="email">Email: {user.email}</div>
                          <div className="phoneNumber">Phone Number: {user.phoneNumber}</div>
                        </div>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      {user.address ? user.address : 'Not have info'}
                    </TableCell>
                    <TableCell align="center">
                      {/* {moment(user.createdAt).format('DD MMM YYYY')} */}
                      {user.isVerify === true ? (
                        <b style={{ color: 'green' }}>verified</b>
                      ) : (
                        <b style={{ color: 'red' }}>not verified</b>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {moment(user.createdAt).format('DD MMM YYYY')}
                    </TableCell>
                    <TableCell align="center">
                      {moment(user.updatedAt).format('DD MMM YYYY')}
                    </TableCell>
                    <TableCell align="center">
                      <Box>
                        <Button
                          variant="text"
                          size="small"
                          style={{ margin: 'auto 10px' }}
                          color="secondary"
                          onClick={(e) => handleConfirmOpen(user.name, user.id)}
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
                    <p>Don`t have any user yet!</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box className="paginationBox">
          <Pagination
            count={Math.ceil(totalUser / params.perPage)}
            shape="rounded"
            color="primary"
            onChange={handlePaginationChange}
          />
        </Box>
      </Box>

      {/* add update category diaglog */}
      {/* <AddUpdateCategory
    idCategory={idCategory}
    isAddUpdateCategoryOpen={isAddUpdateCategoryOpen}
    handleAddUpdateCategoryClose={handleAddUpdateCategoryClose}
    onFormSubmit={handleAddUpdateCategorySubmit}
    categoryInfo={categoryInfo}
  /> */}

      {/* popup confirm delete a category */}
      <PopUpConfirm
        dialogTitle="Confirm delete user?"
        dialogContent="Are you sure want to delete"
        nameConfirm={nameConfirm}
        isConfirmOpen={isConfirmOpen}
        handleConfirmClose={handleConfirmClose}
        onConfirmSubmit={onConfirmSubmit}
      />
    </Box>
  );
}
