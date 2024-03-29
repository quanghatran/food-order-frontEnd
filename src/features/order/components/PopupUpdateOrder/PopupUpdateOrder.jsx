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

export default function PopupUpdateOrder({
  isUpdateOrderOpen,
  handleUpdateOrderClose,
  onSubmit,
  orderStatus,
}) {
  const [status, setStatus] = useState('');

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleFormSubmitRating = () => {
    onSubmit(status);
    setStatus('');
  };

  return (
    <Dialog
      open={isUpdateOrderOpen}
      onClose={handleUpdateOrderClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <form className="formWrapper">
        <DialogTitle
          style={{ backgroundColor: '#3dbe9c', marginBottom: '20px', color: '#fff' }}
          id="alert-dialog-title"
        >
          Update Order
        </DialogTitle>
        <DialogContent>
          <Box px={3} style={{ width: '300px', marginTop: '20px' }}>
            <FormControl fullWidth>
              <InputLabel label="Status Order" id="update-order-status">
                Status Order
              </InputLabel>
              {orderStatus === 'pending' && (
                <Select
                  labelId="update-order-status"
                  id="demo-update-order-status"
                  value={status}
                  label="Status Order"
                  onChange={handleChangeStatus}
                >
                  <MenuItem value="confirm">Confirm</MenuItem>
                  <MenuItem value="canceled">Canceled</MenuItem>
                </Select>
              )}
              {orderStatus === 'confirm' && (
                <Select
                  labelId="update-order-status"
                  id="demo-update-order-status"
                  value={status}
                  label="Status Order"
                  onChange={handleChangeStatus}
                >
                  <MenuItem value="success">Success</MenuItem>
                  <MenuItem value="failed">Failed</MenuItem>
                </Select>
              )}
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            onClick={handleUpdateOrderClose}
          >
            Cancel
          </Button>

          <LoadingButton
            size="small"
            onClick={handleFormSubmitRating}
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
