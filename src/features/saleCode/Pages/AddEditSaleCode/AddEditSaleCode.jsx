import { TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useParams } from 'react-router-dom';
import TitleAdminStorePage from '../../../../components/common/TitleAdminStorePage/TitleAdminStorePage';
import './addEditSaleCode.scss';
import React from 'react';

export default function AddEditSaleCode() {
  const { saleCodeId } = useParams();
  const isUpdate = Boolean(saleCodeId);

  const handleAddEditSaleCode = () => {
    console.log('check add update sale code');
  };

  return (
    <Box className="listSaleCodeWrapper">
      <Box className="headerListSaleCode">
        <TitleAdminStorePage title={isUpdate ? 'Update Sale Code' : 'Add Sale Code'} />
      </Box>
      <Box className="addEditSaleCodeForm">
        <form autoComplete="off" onSubmit={handleAddEditSaleCode}>
          <Box className="addUpdateProductContent">
            <Box className="basicProductInfo">
              <TextField
                label="Name Product"
                color="primary"
                validate="true"
                type="text"
                // onChange={(e) => setName(e.target.value)}
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
                // onChange={(e) => setPrice(e.target.value)}
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
                // onChange={(e) => setDescription(e.target.value)}
                fullWidth
                className="descriptionProduct"
                variant="outlined"
                margin="normal"
                required
              />
            </Box>
          </Box>
          {/* <Box className="buttonAddUpdateWrapper">
            <Button className="cancelButton" variant="contained" color="secondary">
              Cancel
            </Button>
            <Button variant="contained">Add Product</Button>
          </Box> */}
        </form>
      </Box>
    </Box>
  );
}
