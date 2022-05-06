// Material-UI
import { Box, Container, Grid, Typography } from '@mui/material';

// Wave Dividers
import { BottomWaveSVG, TopWaveSVG } from '../../assets/waves';

import { ReactComponent as StepsSVG } from '../../assets/undraw/steps.svg';

const instructions = [
  'Create the schematic of the circuit.',
  'Choose the export protocol.',
  'Done!',
];

export function HowTo({ padding, ...rest }) {
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
        <Container id='instructions' component='section' sx={padding} {...rest}>
          <Grid container spacing={10} alignItems='center'>
            <Grid item xs={12} md={6}>
              <StepsSVG />
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={10} justifyContent='center'>
                <Grid item>
                  <Typography variant='h2'>How to</Typography>
                </Grid>
                <Grid item>
                  {instructions.map((step, id) => (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 3,
                      }}
                      key={id}
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
