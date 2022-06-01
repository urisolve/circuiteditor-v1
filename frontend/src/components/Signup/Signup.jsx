import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Button,
  IconButton,
  Tooltip,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { useBoolean } from '../../hooks';
import { FormField } from '../FormField';
import { validations } from '../../validations';

const schema = yup.object({
  confirmPassword: validations.user.confirmPassword,
  email: validations.user.email,
  firstName: validations.user.name,
  institution: validations.user.institution,
  lastName: validations.user.name,
  mechNumber: validations.user.mechNumber,
  password: validations.user.password,
});

export function Signup({ ...rest }) {
  const { t } = useTranslation();

  const history = useHistory();
  const showPassword = useBoolean(false);
  const { enqueueSnackbar } = useSnackbar();

  const form = useForm({ resolver: yupResolver(schema) });

  async function onSubmit(formData) {
    try {
      await axios.post('api/auth/signup', formData);
      history.push('/circuits');
    } catch {
      enqueueSnackbar(t('feedback.auth.noSignup'), { variant: 'error' });
    }
  }

  return (
    <Card variant='outlined' {...rest}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardHeader
          title={t('page.auth.signup.title')}
          subheader={t('page.auth.signup.subtitle')}
        />

        <CardContent>
          <Grid container columnSpacing={2}>
            <Grid item xs={12}>
              <FormField
                autoComplete='email'
                label={t('form.label.email')}
                name='email'
                placeholder={t('form.placeholder.email')}
                {...form}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormField
                autoComplete='given-name'
                label={t('form.label.firstName')}
                name='firstName'
                placeholder={t('form.placeholder.firstName')}
                {...form}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormField
                autoComplete='family-name'
                label={t('form.label.lastName')}
                name='lastName'
                placeholder={t('form.placeholder.lastName')}
                {...form}
              />
            </Grid>

            <Grid item xs={12}>
              <FormField
                autoComplete='nickname'
                label={t('form.label.mechNumber')}
                name='mechNumber'
                placeholder={t('form.placeholder.mechNumber')}
                {...form}
              />
            </Grid>

            <Grid item xs={12}>
              <FormField
                autoComplete='organization'
                label={t('form.label.institution')}
                name='institution'
                placeholder={t('form.placeholder.institution')}
                {...form}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormField
                autoComplete='new-password'
                label={t('form.label.password')}
                name='password'
                placeholder={t('form.placeholder.password')}
                type={showPassword.value ? 'text' : 'password'}
                {...form}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormField
                autoComplete='new-password'
                label={t('form.label.confirmPassword')}
                name='confirmPassword'
                placeholder={t('form.placeholder.confirmPassword')}
                type={showPassword.value ? 'text' : 'password'}
                {...form}
              />
            </Grid>
          </Grid>
        </CardContent>

        <CardActions>
          <Button type='submit' variant='contained' color='primary'>
            {t('common.signup')}
          </Button>

          <Tooltip
            title={
              showPassword.value
                ? t('form.message.password.hide')
                : t('form.message.password.show')
            }
            arrow
          >
            <IconButton onClick={showPassword.toggle}>
              {showPassword.value ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </Tooltip>
        </CardActions>
      </form>
    </Card>
  );
}
