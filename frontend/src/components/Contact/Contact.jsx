import {
  Button,
  Container,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from '@mui/material';

import { teamMembers } from './teamMembers';
import { TeamMember } from '..';
import { constants } from '../../constants';

export function Contact({ ...rest }) {
  return (
    <Container
      component='section'
      id='contact'
      sx={{ ...constants.SECTION_PADDING }}
      classes={{
        root: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
      {...rest}
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
                  We promise to not share your e-mail with third party services.
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
  );
}
