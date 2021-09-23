import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { UserContext } from '../../contexts/UserContext';
import { TeamMember, teamMembers } from '../../components/TeamMember';
import { ScrollToTopButton } from '../../components/ScrollToTopButton';
import { instructions } from './instructions';

// Section's waves
import { ReactComponent as TopWaveSVG } from '../../assets/waves/top.svg';
import { ReactComponent as BottomWaveSVG } from '../../assets/waves/bottom.svg';

// Section's Images
import { ReactComponent as IntroSVG } from '../../assets/undraw/intro.svg';
import { ReactComponent as StepsSVG } from '../../assets/undraw/steps.svg';

// Material-UI
import {
  Box,
  Button,
  Container,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const sectionPadding = {
  px: 10,
  py: 15,
};
const wave = {
  height: 200,
  width: '100%',
  display: 'block',
};

export const Home = () => {
  const history = useHistory();
  const { user } = useContext(UserContext);

  return (
    <main>
      <ScrollToTopButton />

      <Container id='intro' component='section' sx={sectionPadding}>
        <Grid container spacing={10} alignItems='center'>
          <Grid
            item
            xs={12}
            md
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}
          >
            <Typography
              variant='h2'
              sx={{
                marginBottom: 2,
                fontSize: 56,
                textTransform: 'uppercase',
                fontWeight: 'bold',
                color: '#2F2E41',
              }}
              align='left'
            >
              create circuit schematics
            </Typography>
            <Typography
              variant='h3'
              sx={{
                marginBottom: 5,
                fontSize: 40,
                textTransform: 'uppercase',
                fontWeight: 'thin',
                color: '#2F2E41',
              }}
              align='left'
            >
              and get their analytical model
            </Typography>
            <Button
              size='large'
              sx={{ fontSize: 20 }}
              variant='contained'
              color='primary'
              endIcon={<ChevronRightIcon />}
              onClick={() => history.push(user ? '/circuits' : '/editor')}
            >
              Get Started
            </Button>
          </Grid>
          <Grid item xs={12} md>
            <IntroSVG />
          </Grid>
        </Grid>
      </Container>

      <TopWaveSVG style={wave} />

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

      <BottomWaveSVG style={wave} />

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

      <TopWaveSVG style={wave} />

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
          <Typography variant='body2' align='center'>
            Copyright © 2021 Equipa URIsolve. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </main>
  );
};
