import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  function onContact(data) {
    enqueueSnackbar(t('feedback.notImplemented'), { variant: 'error' });
  }

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
          <Typography variant='h2'>{t('page.home.contact.title')}</Typography>
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
          <form onSubmit={onContact} sx={{ maxWidth: 800 }}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={t('form.label.message')}
                  multiline
                  name='message'
                  placeholder={t('form.placeholder.message')}
                  rows={10}
                  variant='outlined'
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  autoComplete='given-name'
                  fullWidth
                  label={t('form.label.name')}
                  name='name'
                  placeholder={t('form.placeholder.name')}
                  variant='outlined'
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  autoComplete='email'
                  fullWidth
                  label={t('form.label.email')}
                  name='email'
                  placeholder={t('form.placeholder.email')}
                  variant='outlined'
                />

                <FormHelperText>{t('form.message.shareEmail')}</FormHelperText>
              </Grid>

              <Grid
                sx={{ display: 'flex', justifyContent: 'center' }}
                item
                xs={12}
              >
                <Button
                  color='primary'
                  size='large'
                  type='submit'
                  variant='outlined'
                >
                  {t('form.action.send')}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}
