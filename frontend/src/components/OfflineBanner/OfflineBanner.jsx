import { Alert } from '@mui/material';
import OfflineIcon from '@mui/icons-material/SignalWifiStatusbarConnectedNoInternet4';

export const OfflineBanner = ({ isOffline }) => {
  return (
    isOffline && (
      <Alert
        severity='warning'
        iconMapping={{ warning: <OfflineIcon /> }}
        sx={{ justifyContent: 'center' }}
      >
        Network is unavailable
      </Alert>
    )
  );
};
