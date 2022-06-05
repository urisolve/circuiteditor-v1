import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  IconButton,
  Tooltip,
} from '@mui/material';
import RestoreIcon from '@mui/icons-material/SettingsBackupRestore';

export function Settings() {
  const { t } = useTranslation();
  const restoreSettings = useCallback(() => {}, []);

  return (
    <Container>
      <Card variant='outlined' sx={{ mt: 2 }}>
        <CardHeader
          title={t('page.settings.title')}
          subheader={t('page.settings.subtitle')}
          action={
            <Tooltip title={t('common.restore')} arrow>
              <IconButton onClick={restoreSettings}>
                <RestoreIcon fontSize='large' />
              </IconButton>
            </Tooltip>
          }
        />

        <CardContent>
          <Grid></Grid>
        </CardContent>
      </Card>
    </Container>
  );
};
