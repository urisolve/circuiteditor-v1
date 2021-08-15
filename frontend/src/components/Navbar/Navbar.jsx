import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/logo.svg';

// Material-UI components
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Button,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import { useStyles } from './Navbar.styles';

export const Navbar = ({ user }) => {
  const classes = useStyles();

  return (
    <AppBar position='relative' className={classes.appBar}>
      <Toolbar className={classes.bar}>
        <div className={classes.brand}>
          <Logo className={classes.logo} />
          <Typography className={classes.title} variant='h5' noWrap>
            Circuit Editor
          </Typography>
        </div>

        <div className={classes.nav}>
          <Link to='/' className={classes.link}>
            Home
          </Link>
          <Link to='/circuits' className={classes.link}>
            Circuits
          </Link>
          <Link to='/editor' className={classes.link}>
            Editor
          </Link>
        </div>

        <div>
          {user ? (
            <Link to='/account'>
              <Tooltip title='My Account' arrow>
                <IconButton color='inherit'>
                  <Avatar alt={user.fullName?.()} src={user.avatar} />
                </IconButton>
              </Tooltip>
            </Link>
          ) : (
            <Link to='/auth' className={classes.action}>
              <Button color='inherit'>Login</Button>
            </Link>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};
