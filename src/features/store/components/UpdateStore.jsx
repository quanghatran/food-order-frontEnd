import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import { TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function UpdateStore({ isOpen, handleClose, onFormSubmit }) {
  const { loading } = useSelector((state) => state.saleCodes);

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [timeOpen, setTimeOpen] = useState(new Date());
  const [timeClose, setTimeClose] = useState(new Date());

  const handleFormSubmit = async () => {
    const dataSubmit = {
      name: name,
      images: 'images',
      phoneNumber: phoneNumber,
      address: address,
      timeOpen: timeOpen,
      timeClose: timeClose,
    };

    onFormSubmit(dataSubmit);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        style={{ backgroundColor: '#3dbe9c', marginBottom: '20px', color: '#fff' }}
        id="alert-dialog-title"
      >
        Update Store Account
      </DialogTitle>
      <DialogContent>
        <Box px={3}>
          <form className="formWrapper">
            <Box mt={3}>
              <TextField
                label="Name Store"
                color="primary"
                validate="true"
                value={name}
                type="string"
                onChange={(e) => setName(e.target.value)}
                autoFocus
                fullWidth
                variant="outlined"
                margin="normal"
                required
              />
              <TextField
                label="Phone Number"
                color="primary"
                validate="true"
                value={phoneNumber}
                type="number"
                onChange={(e) => setPhoneNumber(e.target.value)}
                fullWidth
                variant="outlined"
                margin="normal"
                required
              />
              <TextField
                label="Address"
                color="primary"
                validate="true"
                value={address}
                type="string"
                onChange={(e) => setAddress(e.target.value)}
                fullWidth
                variant="outlined"
                margin="normal"
                required
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  autoOk
                  variant="inline"
                  inputVariant="outlined"
                  label="Time Open"
                  value={timeOpen}
                  onChange={(newValue) => {
                    setTimeOpen(newValue);
                  }}
                  renderInput={(params) => <TextField margin="normal" fullWidth {...params} />}
                />

                <TimePicker
                  autoOk
                  variant="inline"
                  inputVariant="outlined"
                  label="Time Close"
                  value={timeClose}
                  onChange={(newValue) => {
                    setTimeClose(newValue);
                  }}
                  renderInput={(params) => <TextField margin="normal" fullWidth {...params} />}
                />
              </LocalizationProvider>
            </Box>
          </form>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button size="small" variant="contained" color="secondary" onClick={handleClose}>
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
          Update
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
