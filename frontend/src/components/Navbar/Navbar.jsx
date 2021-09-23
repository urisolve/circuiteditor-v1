import React, { useState, useRef, useCallback, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import { UserContext } from '../../contexts/UserContext';
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
  Menu,
  MenuItem,
  IconButton,
  Divider,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import useMediaQuery from '@mui/material/useMediaQuery';

const menuLink = {
  color: 'black',
  textDecoration: 'none',
};

export const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const gravatar = useGravatar(user?.email);

  // User menu
  const anchorEl = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  // Logout
  const history = useHistory();
  const logOut = useCallback(async () => {
    try {
      await axios.get('/api/auth/logout');
      await setUser(null);
      history.push('/');
    } catch (err) {
      console.error(err);
    }
  }, [setUser, history]);

  const sm = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  return (
    <AppBar
      position='relative'
      color='primary'
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Container>
        <Toolbar>
          <Button
            component={Link}
            to='/'
            sx={{
              p: 0,
              color: 'white',
              textDecoration: 'none',
            }}
          >
            <Logo style={{ width: 60 }} />
            <Typography
              variant='h1'
              noWrap
              sx={{ ml: 2, fontSize: 24, fontWeight: 'regular' }}
            >
              Circuit Editor
            </Typography>
          </Button>

          <Box sx={{ flexGrow: 1 }} />

          {user ? (
            sm ? (
              <Button
                ref={anchorEl}
                onClick={openMenu}
                startIcon={
                  <Avatar
                    alt={`${user.firstName} ${user.lastName}`}
                    src={gravatar}
                  />
                }
                variant='contained'
                color='primary'
                disableElevation
                disableFocusRipple
                style={{ backgroundColor: 'transparent' }}
              >
                {`${user.firstName} ${user.lastName}`}
              </Button>
            ) : (
              <IconButton ref={anchorEl} onClick={openMenu}>
                <Avatar
                  alt={`${user.firstName} ${user.lastName}`}
                  src={gravatar}
                />
              </IconButton>
            )
          ) : (
            <Button
              component={Link}
              to='/auth'
              sx={{ textDecoration: 'none' }}
              color='inherit'
              variant='outlined'
            >
              Login
            </Button>
          )}
        </Toolbar>
      </Container>

      <Menu
        getContentAnchorEl={null}
        anchorEl={anchorEl.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={closeMenu}
        keepMounted
      >
        <MenuItem
          component={Link}
          to='/circuits'
          onClick={closeMenu}
          sx={menuLink}
        >
          <MenuIcon sx={{ mr: 2 }} />
          My Circuits
        </MenuItem>
        <MenuItem
          component={Link}
          to='/account'
          onClick={closeMenu}
          sx={menuLink}
        >
          <PersonIcon sx={{ mr: 2 }} />
          Account
        </MenuItem>
        <MenuItem
          component={Link}
          to='/settings'
          onClick={closeMenu}
          sx={menuLink}
        >
          <SettingsIcon sx={{ mr: 2 }} />
          Settings
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            closeMenu();
            logOut();
          }}
        >
          <ExitToAppIcon sx={{ mr: 2 }} />
          Logout
        </MenuItem>
      </Menu>
    </AppBar>
  );
};
