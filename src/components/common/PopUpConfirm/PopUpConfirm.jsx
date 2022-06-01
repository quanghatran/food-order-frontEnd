import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function PopUpConfirm({
  dialogTitle,
  dialogContent,
  nameConfirm,
  isConfirmOpen,
  handleConfirmClose,
  onConfirmSubmit,
}) {
  const handleSubmitConfirm = () => {
    onConfirmSubmit();
  };

  return (
    <div>
      <Dialog
        open={isConfirmOpen}
        onClose={handleConfirmClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogContent}{' '}
            <b>
              <i>{nameConfirm}</i>
            </b>{' '}
            ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button size="small" color="secondary" variant="contained" onClick={handleSubmitConfirm}>
            Confirm
          </Button>
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={handleConfirmClose}
            autoFocus
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
