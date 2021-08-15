import React from 'react';

// Custom components
import { PersonalInfo } from '../../components/PersonalInfo';
import { SettingsPanel } from '../../components/SettingsPanel';

// Material-UI
import { useStyles } from './Account.styles';
import { Grid } from '@material-ui/core';

export const Account = () => {
  const classes = useStyles();

  return (
    <Grid container direction='row' justify='center' alignItems='flex-start'>
      <Grid className={classes.item} item xs={12} md={6}>
        <PersonalInfo />
      </Grid>
      <Grid className={classes.item} item xs={12} md={6}>
        <SettingsPanel />
      </Grid>
    </Grid>
  );
};
