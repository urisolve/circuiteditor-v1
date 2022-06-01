import { Trans, useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
/* import axios from 'axios'; */

import { useGravatar, useUser } from '../../hooks';
import { FormField } from '../../components';
import { validations } from '../../validations';

import {
  Container,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Avatar,
  Typography,
} from '@mui/material';

const schema = yup.object({
  email: validations.user.email,
  firstName: validations.user.firstName,
  institution: validations.user.institution,
  lastName: validations.user.lastName,
  mechNumber: validations.user.mechNumber,
});

export function Account() {
  const { t } = useTranslation();

  const { user } = useUser();
  const gravatar = useGravatar(user?.email);
  const { enqueueSnackbar } = useSnackbar();

  const form = useForm({ defaultValues: user, resolver: yupResolver(schema) });

  useEffect(() => form.reset(user), [form, user]);

  async function onSubmit(data) {
    enqueueSnackbar(t('feedback.notImplemented'), { variant: 'error' });

    /* try {
      await axios.patch('api/account/info', data);

      enqueueSnackbar('...', {
        variant: 'success',
      });
    } catch ({ response: { statusText } }) {
      enqueueSnackbar(statusText, { variant: 'error' });
    } */

    form.reset();
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Container>
        <Card variant='outlined' sx={{ mt: 2 }}>
          <Container>
            <CardHeader
              title={t('page.account.title')}
              subheader={t('page.account.subtitle')}
            />

            <CardContent>
              <Grid spacing={5} container>
                <Grid item>
                  <Grid
                    direction='row'
                    alignItems='center'
                    spacing={3}
                    container
                  >
                    <Grid item xs={3}>
                      <Avatar
                        alt={t('common.fullName', {
                          given: user.firstName,
                          family: user.lastName,
                        })}
                        src={gravatar}
                        sx={{
                          width: 1,
                          height: 1,
                        }}
                      />
                    </Grid>

                    <Grid item>
                      <Typography variant='h5' gutterBottom>
                        {t('page.account.avatar.title')}
                      </Typography>

                      <Typography variant='body2' color='textSecondary'>
                        <Trans i18nKey='page.account.avatar.subtitle'>
                          We use <a href='https://gravatar.com/'>Gravatar</a>
                          for the profile pictures.
                        </Trans>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item>
                  <Divider />
                </Grid>

                <Grid item>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <FormField
                        label={t('form.label.email')}
                        name='email'
                        placeholder={t('form.placeholder.email')}
                        {...form}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormField
                        label={t('form.label.firstName')}
                        name='firstName'
                        placeholder={t('form.placeholder.firstName')}
                        {...form}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormField
                        label={t('form.label.lastName')}
                        name='lastName'
                        placeholder={t('form.placeholder.lastName')}
                        {...form}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormField
                        label={t('form.label.mechNumber')}
                        name='mechNumber'
                        placeholder={t('form.placeholder.mechNumber')}
                        {...form}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <FormField
                        label={t('form.label.institution')}
                        name='institution'
                        placeholder={t('form.placeholder.institution')}
                        {...form}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>

            <CardActions>
              <Button type='submit' color='primary' variant='contained'>
                {t('form.action.save')}
              </Button>
            </CardActions>
          </Container>
        </Card>
      </Container>
    </form>
  );
}
