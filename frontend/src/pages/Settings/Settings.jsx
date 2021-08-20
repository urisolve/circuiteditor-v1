import React, { useCallback } from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import RestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import { useStyles } from './Settings.styles';

export const Settings = () => {
  const classes = useStyles();

  const restoreSettings = useCallback(() => {}, []);

  return (
    <Container>
      <Card variant='outlined' className={classes.root}>
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
