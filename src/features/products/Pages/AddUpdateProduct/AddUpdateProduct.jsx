import { LoadingButton } from '@mui/lab';
import { Box, Button, Paper, TextField } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import { toast } from 'react-toastify';
import TitleAdminStorePage from '../../../../components/common/TitleAdminStorePage/TitleAdminStorePage';
import { ImportFileField } from '../../../../components/formFields/ImportFileField';
import { getListCategory } from '../../../categories/categoriesSlice';
import { addProduct } from '../../productSlice';
import './addUpdateProduct.scss';

export default function AddUpdateProduct() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isEdit = Boolean(productId);
  const loadingAddUpdateProduct = useSelector((state) => state.products.loading);

  const [listSelectCategory, setListSelectCategory] = useState(null);
  const [name, setName] = useState(null);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState(null);
  const [imageProduct, setImageProduct] = useState(null);
  const [categories, setCategories] = useState([]);

  // get initial list category
  useEffect(() => {
    const fetchGetListCategory = async () => {
      try {
        const listCategory = await dispatch(getListCategory('page=1'));
        unwrapResult(listCategory);

        const listCategoryResult = listCategory.payload.data;

        if (listCategoryResult) {
          let listCategorySelections = listCategoryResult.reduce(function (
            preVal,
            curVal,
            curIndex
          ) {
            const newVal = { label: curVal.name, value: curVal.id };
            return [...preVal, newVal];
          },
          []);

          setListSelectCategory(listCategorySelections);
        }
      } catch (error) {
        console.log('Get list category error: ', error);
      }
    };
    fetchGetListCategory();
  }, []);

  const handleAddUpdateProduct = async () => {
    const formData = new FormData();
    // formData.append('categories', '');
    categories.map((category) => {
      formData.append('categories', category.value);
    });
    formData.append('name', name);
    formData.append('images', imageProduct);
    formData.append('description', description);
    formData.append('price', price);

    try {
      const resultAddProduct = await dispatch(addProduct(formData));
      unwrapResult(resultAddProduct);

      toast.success('Add new product success!');
      navigate('/store/products');
    } catch (error) {
      toast.error('Add product error!');
      console.log(error);
    }
  };

  const handleImportFileChange = (file) => {
    setImageProduct(file);
  };

  const handleCategoriesChange = (data) => {
    setCategories(data);
  };

  return (
    <Box className="addUpdateProductWrapper">
      <Box className="headerListCategory">
        <TitleAdminStorePage title={isEdit ? 'Update Product' : 'Add Product'} />
      </Box>
      <Paper className="productFieldsWrapper">
        <form autoComplete="off">
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
              <Box>
                <span className="imageFIeldTitle">Categories</span>
                <Select
                  isMulti
                  name="colors"
                  options={listSelectCategory}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={handleCategoriesChange}
                />
              </Box>
              <Box className="imageFieldWrapper">
                <span className="imageFIeldTitle">Image product</span>
                <ImportFileField
                  onImportFileChange={handleImportFileChange}
                  // urlImageCategory={(categoryInfo && categoryInfo.image) || null}
                />
              </Box>
            </Box>
          </Box>
          <Box className="buttonAddUpdateWrapper">
            <Button className="cancelButton" variant="contained" color="secondary">
              Cancel
            </Button>

            <LoadingButton
              onClick={handleAddUpdateProduct}
              loading={loadingAddUpdateProduct}
              variant="contained"
            >
              Add Product
            </LoadingButton>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
