import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
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

import { useBoolean } from '../../../hooks';
import { FormField } from '../FormField';
import { validations } from '../../../validations';

const schema = yup.object({
  email: validations.user.email,
  password: validations.user.password,
});

export function Login({ setUser, ...rest }) {
  const history = useHistory();
  const showPassword = useBoolean(false);

  const form = useForm({ resolver: yupResolver(schema) });

  async function onSubmit(formData) {
    try {
      const { data: user } = await axios.post('api/auth/login', formData);

      history.push('/circuits');

      await setUser(user);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Card variant='outlined' {...rest}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardHeader title='Login' subheader='Welcome back.' />

        <CardContent>
          <Grid container>
            <Grid item xs={12}>
              <FormField
                autoComplete='email'
                label='E-mail'
                name='email'
                placeholder='1234567@isep.ipp.pt'
                {...form}
              />
            </Grid>

            <Grid item xs={12}>
              <FormField
                autoComplete='current-password'
                label='Password'
                name='password'
                type={showPassword.value ? 'text' : 'password'}
                {...form}
              />
            </Grid>
          </Grid>
        </CardContent>

        <CardActions>
          <Button type='submit' variant='contained' color='primary'>
            Login
          </Button>

          <Tooltip
            arrow
            title={showPassword.value ? 'Hide password' : 'Show password'}
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
