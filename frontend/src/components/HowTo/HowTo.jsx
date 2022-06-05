import { Box, Container, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { BottomWaveSVG, TopWaveSVG } from '../../assets/waves';

import { ReactComponent as StepsSVG } from '../../assets/undraw/steps.svg';
import { constants } from '../../constants';

export function HowTo({ ...rest }) {
  const { t } = useTranslation();

  const instructions = [
    t('page.home.howTo.step.1'),
    t('page.home.howTo.step.2'),
    t('page.home.howTo.step.3'),
  ];

  return (
    <>
      <TopWaveSVG />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'primary.main',
          color: 'white',
        }}
      >
        <Container
          component='section'
          id='instructions'
          sx={{ ...constants.SECTION_PADDING }}
          {...rest}
        >
          <Grid container spacing={10} alignItems='center'>
            <Grid item xs={12} md={6}>
              <StepsSVG />
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid container spacing={10} justifyContent='center'>
                <Grid item>
                  <Typography variant='h2'>
                    {t('page.home.howTo.title')}
                  </Typography>
                </Grid>

                <Grid item>
                  {instructions.map((step, id) => (
                    <Box
                      key={id}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 3,
                      }}
                    >
                      <Typography variant='h2' sx={{ mr: 5 }}>
                        {`${id + 1}`}
                      </Typography>

                      <Typography variant='h4'>{step}</Typography>
                    </Box>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <BottomWaveSVG />
    </>
  );
}
