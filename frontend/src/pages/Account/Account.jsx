import React from 'react';

// Custom components
import { PersonalInfo } from '../../components/PersonalInfo';
import { SettingsPanel } from '../../components/SettingsPanel';

// Material-UI
import { Container, Grid } from '@material-ui/core';
import { useStyles } from './Account.styles';

export const Account = () => {
  const classes = useStyles();

  return (
    <Container>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='flex-start'
      >
        <Grid className={classes.item} item xs={12} md={6}>
          <PersonalInfo />
        </Grid>
        <Grid className={classes.item} item xs={12} md={6}>
          <SettingsPanel />
        </Grid>
      </Grid>
    </Container>
  );
};
