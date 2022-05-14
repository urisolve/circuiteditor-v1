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
  const history = useHistory();
  const showPassword = useBoolean(false);

  const form = useForm({ resolver: yupResolver(schema) });

  async function onSubmit(formData) {
    try {
      await axios.post('api/auth/signup', formData);
      history.push('/circuits');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Card variant='outlined' {...rest}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardHeader
          title='Signup'
          subheader='Create an account to be able to save the circuits you create. We promise to never share your personal information with any third party services.'
        />

        <CardContent>
          <Grid container columnSpacing={2}>
            <Grid item xs={12}>
              <FormField
                autoComplete='email'
                label='E-mail'
                name='email'
                placeholder='1210000@isep.ipp.pt'
                {...form}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormField
                autoComplete='given-name'
                label='First Name'
                name='firstName'
                placeholder='John'
                {...form}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormField
                autoComplete='family-name'
                label='Last Name'
                name='lastName'
                placeholder='Smith'
                {...form}
              />
            </Grid>
            <Grid item xs={12}>
              <FormField
                autoComplete='nickname'
                label='Mechanographic Nr.'
                name='mechNumber'
                placeholder='1210000'
                {...form}
              />
            </Grid>
            <Grid item xs={12}>
              <FormField
                autoComplete='organization'
                label='Institution'
                name='institution'
                placeholder='Instituto Superior de Engenharia do Porto'
                {...form}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormField
                autoComplete='new-password'
                label='Password'
                name='password'
                type={showPassword.value ? 'text' : 'password'}
                {...form}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormField
                autoComplete='new-password'
                label='Confirm password'
                name='confirmPassword'
                type={showPassword.value ? 'text' : 'password'}
                {...form}
              />
            </Grid>
          </Grid>
        </CardContent>

        <CardActions>
          <Button type='submit' variant='contained' color='primary'>
            Signup
          </Button>

          <Tooltip
            title={showPassword.value ? 'Hide password' : 'Show password'}
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
