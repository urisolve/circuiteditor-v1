import { useEffect, useContext, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { UserContext } from '../../contexts/UserContext';
import { useGravatar } from '../../hooks/useGravatar';
import { FormInput } from '../../components/FormInput';

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

export const Account = () => {
  const { user } = useContext(UserContext);
  const gravatar = useGravatar(user?.email);

  const { register, handleSubmit, errors, reset } = useForm({ mode: 'onBlur' });
  useEffect(() => reset(user), [reset, user]);

  // Send new account information to database
  const onSubmit = useCallback(
    async (data) => {
      try {
        await axios.patch('/api/account/info', data);
      } catch (err) {
        console.error(err);
      }

      reset();
    },
    [reset],
  );

  return (
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
                <Grid direction='row' alignItems='center' spacing={3} container>
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
                    <FormInput
                      name='email'
                      errors={errors}
                      validationFunc={register}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormInput
                      name='mechNumber'
                      errors={errors}
                      validationFunc={register}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormInput
                      name='firstName'
                      errors={errors}
                      validationFunc={register}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormInput
                      name='lastName'
                      errors={errors}
                      validationFunc={register}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormInput
                      name='institution'
                      errors={errors}
                      validationFunc={register}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>

          <CardActions>
            <Button onClick={onSubmit} color='primary' variant='contained'>
              Save Changes
            </Button>
          </CardActions>
        </Container>
      </Card>
    </Container>
  );
};
