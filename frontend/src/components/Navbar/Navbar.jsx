import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { useGravatar } from '../../hooks/useGravatar';
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
  Container,
} from '@material-ui/core';
import { useStyles } from './Navbar.styles';

export const Navbar = ({ user }) => {
  const classes = useStyles();
  const gravatar = useGravatar(user?.email);

  return (
    <AppBar position='relative' className={classes.appBar}>
      <Container>
        <Toolbar>
          <Link to='/' className={classes.link}>
            <div className={classes.brand}>
              <Logo className={classes.logo} />
              <Typography className={classes.title} variant='h5' noWrap>
                Circuit Editor
              </Typography>
            </div>
          </Link>

          <div className={classes.nav}>
            <Link to='/circuits' className={classes.link}>
              Circuits
            </Link>
          </div>

          <div>
            {user ? (
              <Link to='/account' className={classes.userName}>
                <div className={classes.user}>
                  <Tooltip title='My Account' arrow>
                    <IconButton color='inherit'>
                      <Avatar
                        alt={`${user.firstName} ${user.lastName}`}
                        src={gravatar}
                      />
                    </IconButton>
                  </Tooltip>
                  <Typography>
                    {`${user.firstName} ${user.lastName}`}
                  </Typography>
                </div>
              </Link>
            ) : (
              <Link to='/auth' className={classes.action}>
                <Button color='inherit'>Login</Button>
              </Link>
            )}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
