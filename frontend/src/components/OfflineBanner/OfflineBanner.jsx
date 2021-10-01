import React from 'react';
import { Alert } from '@mui/material';

export const OfflineBanner = ({ isOffline }) => {
  return (
    isOffline && (
      <Alert sx={{ justifyContent: 'center' }} severity='warning'>
        Network is unavailable. You are currently offline.
      </Alert>
    )
  );
};
