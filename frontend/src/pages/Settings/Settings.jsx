import { useCallback } from 'react';

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
  const restoreSettings = useCallback(() => {}, []);

  return (
    <Container>
      <Card variant='outlined' sx={{ mt: 2 }}>
        <CardHeader
          title='Settings'
          subheader='Here you can manage the settings of your account'
          action={
            <Tooltip title='Restore Settings' arrow>
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
