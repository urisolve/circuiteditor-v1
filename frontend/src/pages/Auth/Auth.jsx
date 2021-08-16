import React from 'react';

// Custom components
import { Login } from '../../components/Login';
import { Signup } from '../../components/Signup';

// Material-UI
import { Container, Grid } from '@material-ui/core';
import { useStyles } from './Auth.styles';

export const Auth = ({ setUser }) => {
  const classes = useStyles();

  return (
    <Container>
      <Grid
        container
        direction='row'
        justifyContent='center'
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
    </Container>
  );
};
