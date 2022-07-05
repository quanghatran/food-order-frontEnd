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
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function AddUpdateSaleCode({
  idSaleCode,
  isAddUpdateSaleCodeOpen,
  handleAddUpdateSaleCodeClose,
  onFormSubmit,
}) {
  const { loading } = useSelector((state) => state.saleCodes);

  const [saleCodeName, setSaleCodeName] = useState('');
  const [saleCodePercent, setSaleCodePercent] = useState(0);
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  const handleFormSubmit = async () => {
    const dataSubmit = {
      name: saleCodeName,
      discountType: 'percent',
      discountPercent: saleCodePercent,
      discountPrice: 0,
      status: 'active',
      start: start,
      end: end,
    };

    onFormSubmit(dataSubmit);
  };

  return (
    <Dialog
      open={isAddUpdateSaleCodeOpen}
      onClose={handleAddUpdateSaleCodeClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        style={{ backgroundColor: '#3dbe9c', marginBottom: '20px', color: '#fff' }}
        id="alert-dialog-title"
      >
        {!idSaleCode ? 'Add New Sale Code' : 'Update Sale Code'}
      </DialogTitle>
      <DialogContent>
        <Box px={3}>
          <form className="formWrapper">
            <Box mt={3}>
              <TextField
                label="Sale Code Name"
                color="primary"
                validate="true"
                value={saleCodeName}
                type="string"
                onChange={(e) => setSaleCodeName(e.target.value)}
                autoFocus
                fullWidth
                variant="outlined"
                margin="normal"
                required
              />
              <TextField
                label="Percent"
                color="primary"
                validate="true"
                value={saleCodePercent}
                type="number"
                onChange={(e) => setSaleCodePercent(e.target.value)}
                autoFocus
                fullWidth
                variant="outlined"
                margin="normal"
                required
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  autoOk
                  variant="inline"
                  inputVariant="outlined"
                  label="Start Time"
                  value={start}
                  onChange={(newValue) => {
                    setStart(newValue);
                  }}
                  renderInput={(params) => <TextField margin="normal" fullWidth {...params} />}
                />
                <DesktopDatePicker
                  autoOk
                  variant="inline"
                  inputVariant="outlined"
                  label="End Time"
                  value={end}
                  onChange={(newValue) => {
                    setEnd(newValue);
                  }}
                  renderInput={(params) => <TextField margin="normal" fullWidth {...params} />}
                />
              </LocalizationProvider>
            </Box>
          </form>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          onClick={handleAddUpdateSaleCodeClose}
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
          {!idSaleCode ? 'Add' : 'Update'}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
