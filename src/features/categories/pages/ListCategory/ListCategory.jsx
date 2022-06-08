import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/system';
import { unwrapResult } from '@reduxjs/toolkit';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import PopUpConfirm from '../../../../components/common/PopUpConfirm/PopUpConfirm';
import TitleAdminStorePage from '../../../../components/common/TitleAdminStorePage/TitleAdminStorePage';
import {
  addCategory,
  deleteCategory,
  getListCategory,
  updateCategory,
} from '../../categoriesSlice';
import AddUpdateCategory from '../../components/AddUpdateCategory';
import './listCategory.scss';
import React from 'react';

export default function ListCategory() {
  const dispatch = useDispatch();

  const [listCategory, setListCategory] = useState(null);
  const [isDataChange, setIsDataChange] = useState(false);
  const [isAddUpdateCategoryOpen, setIsAddUpdateCategoryOpen] = useState(false);
  const [idCategory, setIdCategory] = useState(null);
  const [nameConfirm, setNameConfirm] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [idConfirm, setIdConfirm] = useState(null);
  const [categoryInfo, setCategoryInfo] = useState(null);

  const handleAddUpdateCategoryOpen = () => {
    setIsAddUpdateCategoryOpen(true);
  };

  const handleAddUpdateCategoryClose = () => {
    setIsAddUpdateCategoryOpen(false);
    setIdCategory(null);
    setCategoryInfo(null);
  };

  // get initial list category
  useEffect(() => {
    const fetchGetListCategory = async () => {
      try {
        const listCategory = await dispatch(getListCategory('page=1'));
        unwrapResult(listCategory);

        setListCategory(listCategory.payload.data);
      } catch (error) {
        console.log('Get list category error: ', error);
      }
    };
    fetchGetListCategory();
  }, [isDataChange]);

  // handle remove category by id
  const handleClickRemoveCategory = async (idCategory) => {
    try {
      await dispatch(deleteCategory(idCategory));

      setIsDataChange(!isDataChange);
      toast.success('Delete category success!');
    } catch (error) {
      toast.error('Delete category failed!');
      console.log(error);
    }
  };

  // handle click submit add update category
  const handleAddUpdateCategorySubmit = async (dataSubmit, idCategory) => {
    if (!idCategory) {
      // add new category
      try {
        const result = await dispatch(addCategory(dataSubmit));
        unwrapResult(result);

        setIsDataChange(!isDataChange);
        setIsAddUpdateCategoryOpen(false);
        toast.success('Add category success!');
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      // update category by id
      try {
        const dataDispatch = {
          idCategory: idCategory,
          dataSubmit: dataSubmit,
        };

        const result = await dispatch(updateCategory(dataDispatch));

        unwrapResult(result);

        setIsDataChange(!isDataChange);
        setIsAddUpdateCategoryOpen(false);
        toast.success('Update category success!');
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const handleClickUpdateCategory = (idCategory, category) => {
    if (idCategory) {
      setIdCategory(idCategory);
      // setIdCategory(null);
      setCategoryInfo(category);
      setIsAddUpdateCategoryOpen(true);
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

  const onConfirmSubmit = () => {
    handleClickRemoveCategory(idConfirm);
    setIsConfirmOpen(false);
  };

  return (
    <Box className="listCategoryWrapper">
      <Box className="headerListCategory">
        <TitleAdminStorePage title="List Category" />
        <Button variant="contained" endIcon={<AddIcon />} onClick={handleAddUpdateCategoryOpen}>
          Add
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
              {listCategory ? (
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
              ) : (
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="center">
                    <p>Don`t have any category yet!</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* add update category diaglog */}
      <AddUpdateCategory
        idCategory={idCategory}
        isAddUpdateCategoryOpen={isAddUpdateCategoryOpen}
        handleAddUpdateCategoryClose={handleAddUpdateCategoryClose}
        onFormSubmit={handleAddUpdateCategorySubmit}
        categoryInfo={categoryInfo}
      />

      {/* popup confirm delete a category */}
      <PopUpConfirm
        dialogTitle="Confirm delete category"
        dialogContent="Are you sure want to delete"
        nameConfirm={nameConfirm}
        isConfirmOpen={isConfirmOpen}
        handleConfirmClose={handleConfirmClose}
        onConfirmSubmit={onConfirmSubmit}
      />
    </Box>
  );
}
