import React from 'react';

// Custom components
import { Login } from '../../components/Login';
import { Signup } from '../../components/Signup';

// Material-UI
import { useStyles } from './Auth.styles';
import Grid from '@material-ui/core/Grid';

export const Auth = ({ setUser }) => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction='row'
      justify='center'
      alignItems='flex-start'
      spacing={1}
    >
      <Grid className={classes.item} item xs={12} md={6}>
        <Login setUser={setUser} />
      </Grid>
      <Grid className={classes.item} item xs={12} md={6}>
        <Signup />
      </Grid>
    </Grid>
  );
};
