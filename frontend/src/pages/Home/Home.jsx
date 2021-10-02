import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { UserContext } from '../../contexts/UserContext';
import { TeamMember, teamMembers } from '../../components/TeamMember';
import { ScrollToTopButton } from '../../components/ScrollToTopButton';
import { instructions } from './instructions';

// Waves
import { ReactComponent as TopWaveSVG } from '../../assets/waves/top.svg';
import { ReactComponent as BottomWaveSVG } from '../../assets/waves/bottom.svg';

// Images
import iPhoneMockups from '../../assets/mockups/iPhoneMockups.png';
import { ReactComponent as StepsSVG } from '../../assets/undraw/steps.svg';

// Material-UI
import {
  Box,
  Button,
  Container,
  FormHelperText,
  Grid,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const sectionPadding = { py: 0, px: 2 };

export const Home = () => {
  const history = useHistory();
  const { user } = useContext(UserContext);

  return (
    <Stack sx={{ mt: { xs: 2, md: 5 } }}>
      <Container id='intro' component='section' sx={sectionPadding}>
        <Stack direction={{ xs: 'column', md: 'row' }} alignItems='center'>
          <Stack
            alignItems={{ xs: 'center', md: 'flex-start' }}
            justifyContent='center'
            sx={{ maxWidth: { xs: 1, md: 1 / 2 } }}
          >
            <Typography
              component='h2'
              variant='h3'
              sx={{
                textTransform: 'uppercase',
                textAlign: { xs: 'center', md: 'left' },
                fontSize: { xs: 36, md: 52 },
              }}
            >
              Create <b>circuit schematics</b> and get their analytical models
            </Typography>
            <Button
              size='large'
              sx={{ fontSize: 20, mt: 5 }}
              variant='contained'
              color='primary'
              endIcon={<ChevronRightIcon />}
              onClick={() => history.push(user ? '/circuits' : '/editor')}
            >
              Get Started
            </Button>
          </Stack>

          <Box
            sx={{
              height: 1,
              width: { xs: 1, md: 1 / 2 },
              pt: { xs: 10, md: 0 },
            }}
          >
            <img
              src={iPhoneMockups}
              alt='iPhone Mockups'
              style={{ width: '100%' }}
            />
          </Box>
        </Stack>
      </Container>

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
        <Container id='instructions' component='section' sx={sectionPadding}>
          <Grid container spacing={10} alignItems='center'>
            <Grid item xs={12} md={6}>
              <StepsSVG />
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={10} justifyContent='center'>
                <Grid item>
                  <Typography variant='h2'>Instructions</Typography>
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

      <Container
        id='contact'
        component='section'
        sx={sectionPadding}
        classes={{
          root: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}
      >
        <Grid container direction='column' alignItems='center' spacing={10}>
          <Grid item>
            <Typography variant='h2'>Contact</Typography>
          </Grid>
          <Grid
            item
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {teamMembers.map((member) => (
              <TeamMember member={member} key={member.name} />
            ))}
          </Grid>
          <Grid item xs={12}>
            <form sx={{ maxWidth: 800 }}>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <TextField
                    name='message'
                    label='Message'
                    placeholder='Describe the problem as well as you can...'
                    variant='outlined'
                    rows={10}
                    multiline
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    name='name'
                    label='Name'
                    placeholder='John Smith'
                    autoComplete='given-name'
                    variant='outlined'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    name='email'
                    label='E-mail'
                    placeholder='1210000@isep.ipp.pt'
                    autoComplete='email'
                    variant='outlined'
                    fullWidth
                  />
                  <FormHelperText>
                    We promise to not share your e-mail with third party
                    services.
                  </FormHelperText>
                </Grid>
                <Grid
                  sx={{ display: 'flex', justifyContent: 'center' }}
                  item
                  xs={12}
                >
                  <Button color='primary' variant='outlined' size='large'>
                    Send
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Container>

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

      <ScrollToTopButton />
    </Stack>
  );
};
