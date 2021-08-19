import React from 'react';
import { Link } from 'react-router-dom';

import { useGravatar } from '../../hooks/useGravatar';
import { ReactComponent as Logo } from '../../assets/brand/logo.svg';

// Material-UI components
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Button,
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
            <a href='#instructions' className={classes.navLink}>
              Instructions
            </a>
            <a href='#contact' className={classes.navLink}>
              Contact
            </a>
          </div>

          <div>
            {user ? (
              <Link to='/account' className={classes.link}>
                <div className={classes.user}>
                  <Avatar
                    className={classes.avatar}
                    alt={`${user.firstName} ${user.lastName}`}
                    src={gravatar}
                  />
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
