import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';

// Contexts
import { UserProvider } from './contexts/UserContext';
import { SettingsCallbacksProvider } from './contexts/SettingsCallbackContext';

// Custom components
import { NotFound, Home, Auth, Account, Circuits, Editor } from './pages';
import { Navbar } from './components/Navbar';

// Material-UI
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useStyles } from './App.styles';

export const App = () => {
  const classes = useStyles();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function grabUser() {
      axios
        .get('/api/auth')
        .then((res) => setUser(res.data))
        .catch();
    }

    grabUser();
  }, []);

  // Dark Mode theme
  const [darkMode, setDarkMode] = useState(user?.settings.darkMode || false);
  const toggleTheme = () => setDarkMode(!darkMode);
  const theme = useMemo(
    () =>
      responsiveFontSizes(
        createTheme({
          palette: {
            type: darkMode ? 'dark' : 'light',
          },
        }),
      ),
    [darkMode],
  );

  return (
    <BrowserRouter>
      <UserProvider value={user}>
        <SettingsCallbacksProvider value={{ toggleTheme }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className={classes.app}>
              <Navbar user={user} />

              <main className={classes.content}>
                <Switch>
                  <Route exact path='/' component={Home} />

                  <Route exact path='/auth'>
                    {user ? (
                      <Redirect to='/circuits' />
                    ) : (
                      <Auth setUser={setUser} />
                    )}
                  </Route>
                  <Route exact path='/account'>
                    {user ? <Account /> : <Redirect to='/auth' />}
                  </Route>
                  <Route exact path='/circuits'>
                    {user ? <Circuits /> : <Redirect to='/auth' />}
                  </Route>
                  <Route exact path='/editor'>
                    <Editor />
                  </Route>

                  <Route component={NotFound} />
                </Switch>
              </main>
            </div>
          </ThemeProvider>
        </SettingsCallbacksProvider>
      </UserProvider>
    </BrowserRouter>
  );
};
