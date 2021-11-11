import { useContext } from 'react';

import { UserContext } from '../../contexts';
import { Login, Signup } from '../../components/UI';

import { Container, Grid, Stack } from '@mui/material';

export function Auth() {
  const { setUser } = useContext(UserContext);

  return (
    <Container>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'center', md: 'flex-start' }}
        justifyContent='center'
        spacing={2}
        sx={{ my: 4 }}
      >
        <Grid item xs={12} md={6} sx={{ flexGrow: 1 }}>
          <Login setUser={setUser} />
        </Grid>
        <Grid item xs={12} md={6} sx={{ flexGrow: 1 }}>
          <Signup />
        </Grid>
      </Stack>
    </Container>
  );
};
