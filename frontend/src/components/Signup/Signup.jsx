import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

// Material-UI
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  FormHelperText,
  Grid,
  TextField,
  Button,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

export const Signup = () => {
  // Password visibility
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  // Form validation hook
  const { register, handleSubmit, errors, watch, reset } = useForm({
    mode: 'onBlur',
  });

  // Route history
  const history = useHistory();

  // Send the new user info to the server and reset the form
  const onSubmit = async (formData) => {
    try {
      await axios.post('/api/auth/signup', formData);
      history.push('/circuits');
    } catch (err) {
      console.error(err);
    }

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader
          title='Signup'
          subheader='Create an account to be able to save the circuits you create. We promise to never share your personal information with any third party services.'
        />

        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name='email'
                label='E-mail'
                placeholder='1210000@isep.ipp.pt'
                autoComplete='email'
                variant='outlined'
                error={errors.email}
                inputRef={register({
                  required: 'This field is required.',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Please enter a valid e-mail address.',
                  },
                })}
                fullWidth
              />
              <FormHelperText>
                {errors.email && errors.email?.message}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name='firstName'
                label='First Name'
                placeholder='John'
                autoComplete='given-name'
                variant='outlined'
                error={errors.firstName}
                inputRef={register({
                  required: 'This field is required.',
                  maxLength: {
                    value: 20,
                    message: 'Cannot exceed 20 characters.',
                  },
                })}
                fullWidth
              />
              <FormHelperText>
                {errors.firstName && errors.firstName?.message}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name='lastName'
                label='Last Name'
                placeholder='Smith'
                autoComplete='family-name'
                variant='outlined'
                error={errors.lastName}
                inputRef={register({
                  required: 'This field is required.',
                  maxLength: {
                    value: 20,
                    message: 'Cannot exceed 20 characters.',
                  },
                })}
                fullWidth
              />
              <FormHelperText>
                {errors.lastName && errors.lastName?.message}
              </FormHelperText>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name='number'
                label='Mechanographic Nr.'
                placeholder='1210000'
                autoComplete='nickname'
                variant='outlined'
                error={errors.number}
                inputRef={register({
                  required: 'This field is required.',
                  validate: (value) => Number.isInteger(parseInt(value)),
                })}
                fullWidth
              />
              <FormHelperText>
                {errors.number && errors.number?.message}
              </FormHelperText>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name='institution'
                label='Institution'
                placeholder='Instituto Superior de Engenharia do Porto'
                autoComplete='organization'
                variant='outlined'
                error={errors.institution}
                inputRef={register({
                  required: 'This field is required.',
                })}
                fullWidth
              />
              <FormHelperText>
                {errors.institution && errors.institution?.message}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name='password'
                label='Password'
                type={showPassword ? 'text' : 'password'}
                autoComplete='new-password'
                variant='outlined'
                error={errors.password}
                inputRef={register({
                  required: 'This field is required.',
                  minLength: {
                    value: 8,
                    message: 'Password must have at least 8 characters.',
                  },
                })}
                fullWidth
              />
              <FormHelperText>
                {errors.password && errors.password?.message}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name='confirmPassword'
                label='Confirm password'
                type={showPassword ? 'text' : 'password'}
                autoComplete='new-password'
                variant='outlined'
                error={errors.confirmPassword}
                inputRef={register({
                  required: 'This field is required.',
                  validate: (value) => value === watch('password'),
                })}
                fullWidth
              />
              <FormHelperText>
                {errors.confirmPassword && errors.confirmPassword?.message}
              </FormHelperText>
            </Grid>
          </Grid>
        </CardContent>

        <CardActions>
          <Button type='submit' variant='contained' color='primary'>
            Signup
          </Button>

          <Tooltip
            title={showPassword ? 'Hide password' : 'Show password'}
            arrow
          >
            <IconButton onClick={toggleShowPassword}>
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    </form>
  );
};
