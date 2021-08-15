import React, { useEffect, useContext } from 'react';
import UserContext from '../contexts/UserContext';
import { useForm } from 'react-hook-form';
import axios from 'axios';

// Material-UI
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormHelperText,
  Grid,
  TextField,
} from '@material-ui/core';

function PersonalInfo() {
  const user = useContext(UserContext);
  const { register, handleSubmit, errors, reset } = useForm({ mode: 'onBlur' });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => reset(user), []);

  // Send new account information to database
  const onSubmit = async (data) => {
    await axios
      .patch('http://localhost:5000/account/info', data)
      .catch((error) => console.log(error.response));

    reset();
  };

  const Form = (props) => (
    <Grid container spacing={2}>
      {props.children}
    </Grid>
  );

  const CategoryDivider = () => (
    <Grid item xs={12}>
      <Divider />
    </Grid>
  );

  const EmailField = () => (
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
      <FormHelperText>{errors.email && errors.email?.message}</FormHelperText>
    </Grid>
  );

  const FirstNameField = () => (
    <Grid item xs={12} sm={4}>
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
  );

  const LastNameField = () => (
    <Grid item xs={12} sm={4}>
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
  );

  const MechNumberField = () => (
    <Grid item xs={12} sm={4}>
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
      <FormHelperText>{errors.number && errors.number?.message}</FormHelperText>
    </Grid>
  );

  const InstitutionField = () => (
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
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader
          title='Personal Information'
          subheader='We promise to never share your personal information with any third party services.'
        />

        <CardContent>
          <Form>
            <EmailField />
            <CategoryDivider />
            <FirstNameField />
            <LastNameField />
            <MechNumberField />
            <InstitutionField />
          </Form>
        </CardContent>

        <CardActions>
          <Button type='submit' color='primary' variant='contained'>
            Save Changes
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}

export default PersonalInfo;
