import React, { useState } from 'react';

// Material-UI
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControl,
  TextField,
  Button,
  Snackbar,
  IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/CloseIcon';

export const BugReport = ({ open, onClose }) => {
  const [reported, setReported] = useState(false);

  return (
    <>
      <Dialog open={open} onClose={onClose} aria-labelledby='Bug Report Dialog'>
        <DialogTitle>Bug Report</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out the following form to report a bug.
          </DialogContentText>

          <FormControl>
            <div id='name-fields'>
              <TextField
                variant='outlined'
                label='First Name'
                placeholder='John'
                margin='normal'
                required
              />
              <TextField
                variant='outlined'
                label='Last Name'
                placeholder='Smith'
                margin='normal'
                required
              />
            </div>
            <TextField
              variant='outlined'
              label='E-mail'
              placeholder='1210000@isep.ipp.pt'
              margin='normal'
              fullWidth
              required
            />
            <TextField
              variant='outlined'
              label='Description'
              helperText='Describe the bug as well as you can...'
              margin='normal'
              rows={6}
              fullWidth
              multiline
              required
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button color='primary' onClick={onClose}>
            Cancel
          </Button>
          <Button
            color='primary'
            onClick={() => {
              onClose();
              setReported(true);
            }}
          >
            Report
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={reported}
        autoHideDuration={3000}
        onClose={() => setReported(false)}
        message='Thank you for the feedback'
        action={
          <IconButton
            size='small'
            aria-label='close'
            color='inherit'
            onClick={() => setReported(false)}
          >
            <CloseIcon fontSize='small' />
          </IconButton>
        }
      />
    </>
  );
};
