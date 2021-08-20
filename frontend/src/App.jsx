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

// Material-UI
import { useStyles } from './App.styles';

export const App = () => {
  const classes = useStyles();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function grabUser() {
      axios
        .get('/api/auth')
        .then((res) => setUser(res.data))
        .catch(console.err);
    }

    grabUser();
  }, []);

  return (
    <UserProvider value={{ user, setUser }}>
      <div className={classes.app}>
        <Navbar />

        <main className={classes.content}>
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
            <Route path='/circuits/:id'>
              {user ? <Editor /> : <Redirect to='/' />}
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
