import { Box, Container, Link, Typography } from '@mui/material';
import { TopWaveSVG } from '../../assets/waves';
import { Trans, useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();

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
            <Trans i18nKey='page.home.footer.createdAt' t={t}>
              Proudly created at{' '}
              <Link
                href='https://www.isep.ipp.pt/'
                target='_blank'
                color='inherit'
              >
                ISEP
              </Link>
            </Trans>
          </Typography>

          <Typography variant='body2' align='center'>
            <Trans i18nKey='page.home.footer.copyright' t={t}>
              Copyright © 2021{' '}
              <Link
                href='https://urisolve.pt/app/'
                target='_blank'
                color='inherit'
              >
                URIsolve
              </Link>
              . All rights reserved.
            </Trans>
          </Typography>
        </Container>
      </Box>
    </>
  );
}
