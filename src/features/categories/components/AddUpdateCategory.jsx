import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ImportFileField } from '../../../components/formFields/ImportFileField';
import categoryApi from '../../../api/categoryApi';
import { unwrapResult } from '@reduxjs/toolkit';

export default function AddUpdateCategory({
  idCategory,
  isAddUpdateCategoryOpen,
  handleAddUpdateCategoryClose,
  onFormSubmit,
  categoryInfo,
}) {
  const { loading } = useSelector((state) => state.categories);

  const [imageProduct, setImageProduct] = useState(null);
  const [categoryName, setNameCategoryName] = useState('');

  const handleImportFileChange = (file) => {
    setImageProduct(file);
  };

  const handleFormSubmit = async () => {
    const formData = new FormData();

    formData.append('name', categoryName);
    formData.append('image', imageProduct);

    await onFormSubmit(formData, idCategory);
    setNameCategoryName('');
  };

  return (
    <Dialog
      open={isAddUpdateCategoryOpen}
      onClose={handleAddUpdateCategoryClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        style={{ backgroundColor: '#3dbe9c', marginBottom: '20px', color: '#fff' }}
        id="alert-dialog-title"
      >
        {!idCategory ? 'Add New Category' : 'Update Category'}
      </DialogTitle>
      <DialogContent>
        <Box px={3}>
          <form className="formWrapper">
            <Typography mb={2} variant="subtitle1">
              Choose file image
            </Typography>
            <ImportFileField
              onImportFileChange={handleImportFileChange}
              urlImageCategory={(categoryInfo && categoryInfo.image) || null}
            />

            <Box mt={3}>
              <TextField
                label="Category Name"
                color="primary"
                validate="true"
                value={categoryName}
                type="string"
                onChange={(e) => setNameCategoryName(e.target.value)}
                autoFocus
                fullWidth
                variant="outlined"
                margin="normal"
                required
              />
            </Box>
          </form>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          onClick={handleAddUpdateCategoryClose}
        >
          Cancel
        </Button>

        <LoadingButton
          size="small"
          onClick={handleFormSubmit}
          loading={loading}
          color="primary"
          variant="contained"
          autoFocus
        >
          {!idCategory ? 'Add' : 'Update'}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
