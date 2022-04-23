// Material-UI
import { Box, Container, Link, Typography } from '@mui/material';

// Wave Divider
import { TopWaveSVG } from '../../../assets/waves';

export function Footer() {
  return (
    <>
      <TopWaveSVG />
      <Box
        component='footer'
        id='footer'
        sx={{
          backgroundColor: '#3F51B5',
          color: 'white',
          p: 2,
        }}
      >
        <Container component='section'>
          <Typography align='center' gutterBottom>
            Proudly created at{' '}
            <Link
              href='https://www.isep.ipp.pt/'
              target='_blank'
              color='inherit'
            >
              ISEP
            </Link>
          </Typography>
          <Typography variant='body2' align='center'>
            Copyright © 2021{' '}
            <Link
              href='https://urisolve.pt/app/'
              target='_blank'
              color='inherit'
            >
              URIsolve
            </Link>
            . All rights reserved.
          </Typography>
        </Container>
      </Box>
    </>
  );
}
