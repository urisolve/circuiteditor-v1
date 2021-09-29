import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';

import { Global } from '@emotion/react';
import { grey } from '@mui/material/colors';

import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';

import { App } from './App.jsx';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Global
          styles={{
            '*::-webkit-scrollbar': {
              width: 10,
              height: 10,
            },
            '*::-webkit-scrollbar-track': {
              display: 'none',
            },
            '*::-webkit-scrollbar-thumb': {
              borderRadius: theme.spacing(2),
              background: grey[500],
              '&:hover': {
                background: grey[400],
              },
            },
            html: {
              scrollBehavior: 'smooth',
              overflowY: 'overlay',
            },
          }}
        />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
