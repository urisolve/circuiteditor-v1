import React from 'react';

import { Container, Typography } from '@material-ui/core';
import { useStyles } from './Footer.styles';

export const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container>
        <Typography variant='body2' align='center'>
          Copyright © 2021 Equipa URIsolve. All rights reserved.
        </Typography>
      </Container>
    </footer>
  );
};
