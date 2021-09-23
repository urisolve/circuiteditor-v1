import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';

// Contexts
import { UserProvider } from './contexts/UserContext';

// Custom components
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

export const App = () => {
  const [user, setUser] = useState(null);

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
      <div
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
        }}
      >
        <Navbar />

        <main
          sx={{
            display: 'flex',
            flexGrow: 1,
          }}
        >
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
        </main>
      </div>
    </UserProvider>
  );
};
