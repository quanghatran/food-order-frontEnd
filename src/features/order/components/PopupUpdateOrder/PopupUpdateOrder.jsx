import { LoadingButton } from '@mui/lab';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Box } from '@mui/system';

export default function PopupUpdateOrder({ isUpdateOrderOpen, handleUpdateOrderClose, onSubmit }) {
  const handleFormSubmitRating = () => {
    onSubmit('test');
  };

  console.log(isUpdateOrderOpen);

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
          <Box px={3}>selection of order status</Box>
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
