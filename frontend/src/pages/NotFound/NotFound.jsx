import React from 'react';

import { ReactComponent as NotFoundSVG } from '../../assets/undraw/not-found.svg';

// Material-UI
import { Container, Grid, Typography } from '@mui/material';

export const NotFound = () => {
  return (
    <Container sx={{ mt: 10 }}>
      <Grid container alignItems='center' justifyContent='center' spacing={10}>
        <Grid item xs={12} lg={5}>
          <NotFoundSVG />
        </Grid>
        <Grid item xs={12} lg>
          <Typography variant='h1'>Error 404:</Typography>
          <Typography variant='h2' color='textSecondary'>
            Page not found
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};
