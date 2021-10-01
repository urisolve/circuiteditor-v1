import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';

// Material-UI
import { Stack } from '@mui/material';

// Custom components, contexts, and hooks
import {
  NotFound,
  Home,
  Auth,
  Account,
  Circuits,
  Editor,
  Settings,
} from './pages';
import { Navbar } from './components/Navbar';
import { useOnline } from './hooks/useOnline';
import { UserProvider } from './contexts/UserContext';
import { OfflineBanner } from './components/OfflineBanner';

export const App = () => {
  const [user, setUser] = useState(null);
  const isOnline = useOnline();

  useEffect(() => {
    async function grabUser() {
      try {
        const { data } = await axios.get('/api/auth');
        setUser(data);
      } catch (err) {
        console.error(err);
      }
    }

    grabUser();
  }, []);

  return (
    <UserProvider value={{ user, setUser }}>
      <Stack sx={{ height: '100vh' }}>
        <Navbar />
        <OfflineBanner isOffline={!isOnline} />

        <Stack component='main' sx={{ flexGrow: 1 }}>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route exact path='/auth'>
              {user ? <Redirect to='/circuits' /> : <Auth />}
            </Route>
            <Route exact path='/account'>
              {user ? <Account /> : <Redirect to='/' />}
            </Route>
            <Route exact path='/settings'>
              {user ? <Settings /> : <Redirect to='/' />}
            </Route>
            <Route exact path='/circuits'>
              {user ? <Circuits /> : <Redirect to='/' />}
            </Route>
            <Route path='/editor/:id'>
              {user ? <Editor /> : <Redirect to='/' />}
            </Route>
            <Route exact path='/editor'>
              <Editor />
            </Route>
            <Route path='*'>
              <NotFound />
            </Route>
          </Switch>
        </Stack>
      </Stack>
    </UserProvider>
  );
};
