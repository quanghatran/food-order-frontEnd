import { Button, Rating } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/system';
import { unwrapResult } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import TitleAdminStorePage from '../../../../components/common/TitleAdminStorePage/TitleAdminStorePage';
import '../../../categories/pages/ListCategory/listCategory.scss';
import { deleteStore, getAllStore } from '../../storeManagerSlice';
import './listStoreManager.scss';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import PopUpConfirm from '../../../../components/common/PopUpConfirm/PopUpConfirm';
import { toast } from 'react-toastify';
import storeImage from '../../../../assets/images/user/storeImage.webp';
export default function ListStoreManager() {
  const dispatch = useDispatch();

  const [listStore, setListStore] = useState(null);
  const [nameConfirm, setNameConfirm] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [idConfirm, setIdConfirm] = useState(null);
  const [isDataChange, setIsDataChange] = useState(false);

  // get list store
  useEffect(() => {
    const fetchGetAllStore = async () => {
      try {
        const store = await dispatch(getAllStore());
        unwrapResult(store);
        setListStore(store.payload);
      } catch (error) {
        console.log('Get list store error: ', error);
      }
    };

    fetchGetAllStore();
  }, [isDataChange]);

  // const handlePaginationChange = (event, value) => {
  //   setParams({ ...params, page: value });
  // };

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
  const handleClickRemoveStore = async (idStore) => {
    try {
      await dispatch(deleteStore(idStore));
      setIsDataChange(!isDataChange);
      toast.success('Delete store success!');
    } catch (error) {
      toast.error('Delete store failed!');
      console.log(error);
    }
  };

  const onConfirmSubmit = () => {
    handleClickRemoveStore(idConfirm);
    setIsConfirmOpen(false);
  };

  return (
    <Box className="listCategoryWrapper listUserWrapper">
      <Box className="headerListCategory">
        <TitleAdminStorePage title="Store Manager" />
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
                  Email
                </TableCell>
                <TableCell className="tableHeaderItem" align="center">
                  Phone Number
                </TableCell>
                <TableCell className="tableHeaderItem" align="center">
                  Address
                </TableCell>
                <TableCell className="tableHeaderItem" align="center">
                  Time Open
                </TableCell>
                <TableCell className="tableHeaderItem" align="center">
                  Time Close
                </TableCell>
                <TableCell className="tableHeaderItem" align="center">
                  Modify
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listStore ? (
                listStore.map((store) => (
                  <TableRow
                    key={store.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="center" component="th" scope="row">
                      <Box className="userDetail">
                        <img
                          className="userImage"
                          style={{ objectFit: 'cover' }}
                          src={store.image ?? storeImage}
                          width="55"
                          height="55"
                          alt="user"
                        />
                        <div className="userDetailBox">
                          <div
                            className="name"
                            style={{
                              fontSize: '18px',
                            }}
                          >
                            <b>{store.name}</b>
                          </div>
                          <div
                            className="email"
                            style={{
                              display: 'flex',
                              alignItems: 'flex-end',
                              marginBottom: '10px',
                            }}
                          >
                            <span>rating: </span>
                            <Rating
                              size="small"
                              style={{ marginTop: '10px' }}
                              name="half-rating-read"
                              defaultValue={store.star}
                              precision={0.5}
                              readOnly
                            />
                          </div>
                          <div className="phoneNumber">
                            status:{' '}
                            {store.status === 'active' ? (
                              <b style={{ color: 'green' }}>{store.status}</b>
                            ) : (
                              <b style={{ color: 'red' }}>{store.status}</b>
                            )}
                          </div>
                        </div>
                      </Box>
                    </TableCell>
                    <TableCell align="center">{store.email}</TableCell>
                    <TableCell align="center">{store.phoneNumber}</TableCell>
                    <TableCell align="center">
                      {store.address ? store.address : 'Not have info'}
                    </TableCell>
                    <TableCell align="center">
                      {store.timeOpen ? store.timeOpen : 'Not have info'}
                      {/* {store.timeOpen ? moment(store.timeOpen).format('DD MMM YYYY') : 'Not have info'} */}
                    </TableCell>
                    <TableCell align="center">
                      {store.timeClose ? store.timeClose : 'Not have info'}
                      {/* {store.timeClose ? moment(store.timeClose).format('DD MMM YYYY') : 'Not have info'} */}
                    </TableCell>

                    <TableCell align="center">
                      <Box>
                        <Button
                          variant="text"
                          size="small"
                          style={{ margin: 'auto 10px' }}
                          color="secondary"
                          onClick={(e) => handleConfirmOpen(store.name, store.id)}
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
        {/* <Box className="paginationBox">
          <Pagination
            count={Math.ceil(totalUser / params.perPage)}
            shape="rounded"
            color="primary"
            onChange={handlePaginationChange}
          />
        </Box> */}
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
        dialogTitle="Confirm delete store?"
        dialogContent="Are you sure want to delete"
        nameConfirm={nameConfirm}
        isConfirmOpen={isConfirmOpen}
        handleConfirmClose={handleConfirmClose}
        onConfirmSubmit={onConfirmSubmit}
      />
    </Box>
  );
}
