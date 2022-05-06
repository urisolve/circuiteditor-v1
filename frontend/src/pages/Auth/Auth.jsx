import { useContext } from 'react';

import { UserContext } from '../../contexts';
import { Login, Signup } from '../../components';

import { Container, Grid } from '@mui/material';

export function Auth() {
  const { setUser } = useContext(UserContext);

  return (
    <Container>
      <Grid
        container
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'center', md: 'flex-start' }}
        justifyContent='center'
        spacing={2}
        sx={{ my: 4 }}
      >
        <Grid item xs={12} md={6}>
          <Login setUser={setUser} />
        </Grid>

        <Grid item xs={12} md={6}>
          <Signup />
        </Grid>
      </Grid>
    </Container>
  );
};
