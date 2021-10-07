import { useState, useContext } from 'react';
import axios from 'axios';

import { SettingsCallbacksContext } from '../../contexts/SettingsCallbackContext';
import { UserContext } from '../../contexts/UserContext';

// Material-UI
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Switch,
  Typography,
} from '@mui/material';
import Brightness3Icon from '@mui/icons-material/Brightness3';

export const SettingsPanel = () => {
  // Load data from providers
  const callbacks = useContext(SettingsCallbacksContext);
  const user = useContext(UserContext);

  // Settings state logic
  const [settings, setSettings] = useState(user.settings);
  const updateSettings = (newSettings, callback = null) => {
    setSettings({ ...settings, ...newSettings });
    callback?.();
  };

  // Send new account information to database
  const onSubmit = async () => {
    await axios
      .patch('http://localhost:5000/account/settings', settings)
      .catch((error) => console.log(error.response));
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

  const DarkMode = () => (
    <Grid item xs={12}>
      <Grid container alignItems='center'>
        <Grid item xs={1}>
          <Brightness3Icon />
        </Grid>
        <Grid item xs={4}>
          <Typography variant='body1' noWrap>
            Dark Mode
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Switch
            edge='end'
            checked={settings.darkMode}
            onChange={() =>
              updateSettings(
                { darkMode: !settings.darkMode },
                callbacks.toggleTheme,
              )
            }
          />
        </Grid>
      </Grid>
    </Grid>
  );

  return (
    <Card>
      <CardHeader title='Settings' subheader='Change the way this app looks.' />

      <CardContent>
        <Form>
          <DarkMode />
          <CategoryDivider />
        </Form>
      </CardContent>

      <CardActions>
        <Button onClick={onSubmit} color='primary' variant='contained'>
          Save Changes
        </Button>
      </CardActions>
    </Card>
  );
};
