import React from 'react';

import { ReactComponent as NotFoundSVG } from '../../assets/undraw/not-found.svg';

// Material-UI
import { makeStyles, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(10),
  },
}));

export const NotFound = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container alignItems='center' justify='center' spacing={10}>
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
    </div>
  );
};
