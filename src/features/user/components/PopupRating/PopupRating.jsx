import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from 'react';
import { ImportFileField } from '../../../../components/formFields/ImportFileField';
import { InputField } from '../../../../components/formFields/InputField';

export default function PopupRating({ isRatingOpen, handleRatingClose, onSubmit }) {
  const [image, setImage] = useState(null);
  const [value, setValue] = useState(5);
  const [content, setContent] = useState('');

  const handleImportFileChange = (file) => {
    setImage(file);
  };

  const handleFormSubmitRating = () => {
    const formData = new FormData();

    formData.append('images', image);
    formData.append('content', content);
    formData.append('star', value);

    onSubmit(formData);
  };

  return (
    <Dialog
      open={isRatingOpen}
      onClose={handleRatingClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <form className="formWrapper">
        <DialogTitle
          style={{ backgroundColor: '#3dbe9c', marginBottom: '20px', color: '#fff' }}
          id="alert-dialog-title"
        >
          Rating Order
        </DialogTitle>
        <DialogContent>
          <Box px={3} style={{ width: '400px' }}>
            <Box mt={3}>
              <Box className="imageFieldWrapper" style={{ marginBottom: '25px' }}>
                <span className="imageFIeldTitle">Image</span>
                <ImportFileField
                  onImportFileChange={handleImportFileChange}
                  // urlImageCategory={(categoryInfo && categoryInfo.image) || null}
                />
              </Box>
              <TextField
                label="Content"
                color="primary"
                validate="true"
                type="string"
                onChange={(e) => setContent(e.target.value)}
                fullWidth
                variant="outlined"
                margin="normal"
                required
              />
              <Box mt={3}>
                <div style={{ marginBottom: '10px' }} className="imageFIeldTitle">
                  Rating
                </div>
                {/* <Rating
                  name="simple-controlled"
                  value={star}
                  onChange={(star) => {
                    setStar(star);
                  }}
                /> */}
                <Rating
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button size="small" variant="contained" color="secondary" onClick={handleRatingClose}>
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
