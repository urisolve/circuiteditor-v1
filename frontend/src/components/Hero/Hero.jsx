import { useHistory } from 'react-router-dom';

import { Box, Button, Container, Stack, Typography } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import mockup from '../../assets/mockups/mockup.webp';
import { useUser } from '../../hooks';
import { constants } from '../../constants';

export function Hero({ ...rest }) {
  const { user } = useUser();
  const history = useHistory();

  return (
    <Container
      component='section'
      id='intro'
      sx={{ ...constants.SECTION_PADDING }}
      {...rest}
    >
      <Stack
        alignItems='center'
        direction={{ xs: 'column-reverse', md: 'row' }}
      >
        <Stack
          alignItems={{ xs: 'center', md: 'flex-start' }}
          justifyContent='center'
          sx={{ maxWidth: { xs: 1, md: '40%' } }}
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
            color='primary'
            endIcon={<ChevronRightIcon />}
            onClick={() => history.push(user ? '/circuits' : '/editor')}
            size='large'
            sx={{ fontSize: 20, mt: 5 }}
            variant='contained'
          >
            Get Started
          </Button>
        </Stack>

        <Box sx={{ height: 1, width: { xs: 1, md: '60%' }, py: 4 }}>
          <img alt='iPhone Mockups' src={mockup} style={{ width: '100%' }} />
        </Box>
      </Stack>
    </Container>
  );
}
