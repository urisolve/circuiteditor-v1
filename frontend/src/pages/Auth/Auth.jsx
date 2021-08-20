import React, { useContext } from 'react';

import { UserContext } from '../../contexts/UserContext';
import { Login } from '../../components/Login';
import { Signup } from '../../components/Signup';

import { Container, Grid } from '@material-ui/core';
import { useStyles } from './Auth.styles';

export const Auth = () => {
  const classes = useStyles();
  const { setUser } = useContext(UserContext);

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
