import { Box, Button, Paper, TextField } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import TitleAdminStorePage from '../../../../components/common/TitleAdminStorePage/TitleAdminStorePage';
import { ImportFileField } from '../../../../components/formFields/ImportFileField';
import { getListCategory } from '../../../categories/categoriesSlice';
import './addUpdateProduct.scss';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

export default function AddUpdateProduct() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const isEdit = Boolean(productId);

  const [listCategory, setListCategory] = useState(null);
  const [name, setName] = useState(null);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState(null);
  const [imageProduct, setImageProduct] = useState(null);
  const [optionCategories, setOptionCategories] = useState(null);

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
  }, []);

  const handleAddUpdateProduct = () => {
    const dataSubmit = { name, description, price };

    console.log('check add update product: ', dataSubmit);
  };

  const handleImportFileChange = (file) => {
    setImageProduct(file);
  };

  console.log(listCategory);
  // listCategory.map((category) => {
  //   setOptionCategories({ ...optionCategories, value: category.id, label: category.name });
  // });

  // console.log(optionCategories);

  return (
    <Box className="addUpdateProductWrapper">
      <Box className="headerListCategory">
        <TitleAdminStorePage title={isEdit ? 'Update Product' : 'Add Product'} />
      </Box>
      <Paper className="productFieldsWrapper">
        <form autoComplete="off" onSubmit={handleAddUpdateProduct}>
          <Box className="addUpdateProductContent">
            <Box className="basicProductInfo">
              <TextField
                label="Name Product"
                color="primary"
                validate="true"
                type="text"
                onChange={(e) => setName(e.target.value)}
                autoFocus
                fullWidth
                variant="outlined"
                margin="normal"
                required
              />
              <TextField
                label="Price"
                color="primary"
                validate="true"
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                fullWidth
                variant="outlined"
                margin="normal"
                required
              />
              <TextField
                label="Description"
                color="primary"
                validate="true"
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                className="descriptionProduct"
                variant="outlined"
                margin="normal"
                required
              />
            </Box>
            <Box className="imageCategoryProduct">
              <Box className="imageFieldWrapper">
                {/* <span className="imageFIeldTitle">Image product</span> */}
                <ImportFileField
                  onImportFileChange={handleImportFileChange}
                  // urlImageCategory={(categoryInfo && categoryInfo.image) || null}
                />
              </Box>
              <Box>
                {/* <Select
                  options={options}
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                /> */}
              </Box>
            </Box>
          </Box>
          <Box className="buttonAddUpdateWrapper">
            <Button className="cancelButton" variant="contained" color="secondary">
              Cancel
            </Button>
            <Button variant="contained">Add Product</Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
