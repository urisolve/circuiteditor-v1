import { Alert } from '@mui/material';
import { useTranslation } from 'react-i18next';
import OfflineIcon from '@mui/icons-material/SignalWifiStatusbarConnectedNoInternet4';

export function OfflineBanner({ isOffline }) {
  const { t } = useTranslation();

  if (!isOffline) {
    return null;
  }

  return (
    <Alert
      severity='warning'
      iconMapping={{ warning: <OfflineIcon /> }}
      sx={{ justifyContent: 'center' }}
    >
      {t('banner.offline')}
    </Alert>
  );
};
