import { Login, Signup } from '../../components';
import { useUser } from '../../hooks';

import { Container, Grid } from '@mui/material';

export function Auth() {
  const { setUser } = useUser();

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
}
