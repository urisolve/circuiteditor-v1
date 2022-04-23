import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

// Material-UI
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { UserContext } from '../../../contexts';
import iPhoneMockups from '../../../assets/mockups/iPhoneMockups.png';

export function Hero({ padding, ...rest }) {
  const { user } = useContext(UserContext);
  const history = useHistory();

  return (
    <Container id='intro' component='section' sx={padding} {...rest}>
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
  );
}
