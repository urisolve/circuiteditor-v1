import { useState, useEffect, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import HttpStatusCodes from 'http-status-enum';

import { Stack } from '@mui/material';

import {
  NotFound,
  Home,
  Auth,
  Account,
  Circuits,
  Editor,
  Settings,
} from './pages';
import { Navbar, OfflineBanner } from './components';
import { useOnline } from './hooks';
import { UserContext } from './contexts';

export function App() {
  const [user, setUser] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const isOnline = useOnline();

  useEffect(() => {
    async function grabUser() {
      try {
        const { data: user } = await axios.get('api/auth');

        setUser(user);
      } catch ({ response: { status, statusText } }) {
        if (status !== HttpStatusCodes.UNAUTHORIZED) {
          enqueueSnackbar(statusText, { variant: 'error' });
        }
      }
    }

    grabUser();
  }, [enqueueSnackbar]);

  return (
    <Suspense fallback=''>
      <UserContext.Provider value={{ user, setUser }}>
        <Stack sx={{ minHeight: '100vh' }}>
          <Navbar />

          <OfflineBanner isOffline={!isOnline} />

          <Stack component='main' flexGrow={1}>
            <Switch>
              <Route exact path='/'>
                <Home />
              </Route>

              <Route exact path='/auth'>
                {user ? <Redirect to='/circuits' /> : <Auth />}
              </Route>

              <Route exact path='/account'>
                {user ? <Account /> : <Redirect to='/auth' />}
              </Route>

              <Route exact path='/settings'>
                {user ? <Settings /> : <Redirect to='/auth' />}
              </Route>

              <Route exact path='/circuits'>
                {user ? <Circuits /> : <Redirect to='/auth' />}
              </Route>

              <Route path='/editor/:circuitId'>
                {user ? <Editor /> : <Redirect to='/auth' />}
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
      </UserContext.Provider>
    </Suspense>
  );
}
