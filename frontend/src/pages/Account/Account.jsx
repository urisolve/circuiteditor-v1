import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import axios from 'axios';

import { useGravatar, useUser } from '../../hooks';
import { FormField } from '../../components';

// Material-UI
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
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object({
  email: yup.string().email().required(),
  firstName: yup.string().trim().required(),
  institution: yup.string().trim().required(),
  lastName: yup.string().trim().required(),
  mechNumber: yup
    .number()
    .integer()
    .positive()
    .typeError('Must be a number')
    .required(),
});

export function Account() {
  const { user } = useUser();
  const gravatar = useGravatar(user?.email);

  const form = useForm({ defaultValues: user, resolver: yupResolver(schema) });

  useEffect(() => form.reset(user), [form, user]);

  async function onSubmit(data) {
    try {
      await axios.patch('api/account/info', data);
    } catch (error) {
      console.error(error);
    }

    form.reset();
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Container>
        <Card variant='outlined' sx={{ mt: 2 }}>
          <Container>
            <CardHeader
              title='Account'
              subheader='We promise to never share your personal information with any third party services.'
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
                        alt={`${user.firstName} ${user.lastName}`}
                        src={gravatar}
                        sx={{
                          width: 1,
                          height: 1,
                        }}
                      />
                    </Grid>

                    <Grid item>
                      <Typography variant='h5' gutterBottom>
                        Profile picture
                      </Typography>

                      <Typography variant='body2' color='textSecondary'>
                        We use <a href='https://gravatar.com/'>Gravatar</a> for
                        the profile pictures.
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
                      <FormField label='Email' name='email' {...form} />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormField
                        label='First Name'
                        name='firstName'
                        {...form}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormField label='Last Name' name='lastName' {...form} />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormField
                        label='Mechanographic Nr.'
                        name='mechNumber'
                        {...form}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <FormField
                        label='Institution'
                        name='institution'
                        {...form}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>

            <CardActions>
              <Button type='submit' color='primary' variant='contained'>
                Save Changes
              </Button>
            </CardActions>
          </Container>
        </Card>
      </Container>
    </form>
  );
}
