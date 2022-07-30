import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';

export default function UpdateStorePopup({
  isUpdateStatusStoreOpen,
  handleUpdateStatusStoreClose,
  onSubmit,
  // storeStatus,
}) {
  const [status, setStatus] = useState('');

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleFormSubmitUpdateStatus = () => {
    onSubmit(status);
    setStatus('');
  };

  return (
    <Dialog
      open={isUpdateStatusStoreOpen}
      onClose={handleUpdateStatusStoreClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <form className="formWrapper">
        <DialogTitle
          style={{ backgroundColor: '#3dbe9c', marginBottom: '20px', color: '#fff' }}
          id="alert-dialog-title"
        >
          Update Store
        </DialogTitle>
        <DialogContent>
          <Box px={3} style={{ width: '300px', marginTop: '20px' }}>
            <FormControl fullWidth>
              <InputLabel label="Status Store" id="update-order-status">
                Status Store
              </InputLabel>

              <Select
                labelId="update-order-status"
                id="demo-update-order-status"
                value={status}
                label="Status Store"
                onChange={handleChangeStatus}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            onClick={handleUpdateStatusStoreClose}
          >
            Cancel
          </Button>

          <LoadingButton
            size="small"
            onClick={handleFormSubmitUpdateStatus}
            color="primary"
            variant="contained"
            autoFocus
          >
            Confirm
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
}
