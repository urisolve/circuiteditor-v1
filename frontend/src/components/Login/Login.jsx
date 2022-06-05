import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
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
  email: validations.user.email,
  password: validations.user.password,
});

export function Login({ setUser, ...rest }) {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const showPassword = useBoolean(false);

  const form = useForm({ resolver: yupResolver(schema) });

  async function onSubmit(formData) {
    try {
      const { data: user } = await axios.post('api/auth/login', formData);

      history.push('/circuits');
      setUser(user);
    } catch {
      enqueueSnackbar(t('feedback.auth.noLogin'), { variant: 'error' });
    }
  }

  return (
    <Card variant='outlined' {...rest}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardHeader
          title={t('page.auth.login.title')}
          subheader={t('page.auth.login.subtitle')}
        />

        <CardContent>
          <Grid container>
            <Grid item xs={12}>
              <FormField
                autoComplete='email'
                label={t('form.label.email')}
                name='email'
                placeholder={t('form.placeholder.email')}
                {...form}
              />
            </Grid>

            <Grid item xs={12}>
              <FormField
                autoComplete='current-password'
                label={t('form.label.password')}
                name='password'
                placeholder={t('form.placeholder.password')}
                type={showPassword.value ? 'text' : 'password'}
                {...form}
              />
            </Grid>
          </Grid>
        </CardContent>

        <CardActions>
          <Button type='submit' variant='contained' color='primary'>
            {t('common.login')}
          </Button>

          <Tooltip
            arrow
            title={
              showPassword.value
                ? t('form.message.password.hide')
                : t('form.message.password.show')
            }
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
