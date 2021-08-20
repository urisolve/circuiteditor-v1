import React, { useState, useRef } from 'react';
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
  Hidden,
  Menu,
  MenuItem,
  IconButton,
  Divider,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useStyles } from './Navbar.styles';

export const Navbar = ({ user }) => {
  const classes = useStyles();
  const gravatar = useGravatar(user?.email);

  const anchorEl = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  const sm = useMediaQuery((theme) => theme.breakpoints.up('sm'));

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
            <Hidden smDown>
              <a href='#instructions' className={classes.navLink}>
                Instructions
              </a>
              <a href='#contact' className={classes.navLink}>
                Contact
              </a>
            </Hidden>
          </div>

          {user ? (
            sm ? (
              <Button
                ref={anchorEl}
                onClick={openMenu}
                startIcon={
                  <Avatar
                    className={classes.avatar}
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
            <Link to='/auth' className={classes.action}>
              <Button color='inherit'>Login</Button>
            </Link>
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
        <Link to='/account' className={classes.menuLink}>
          <MenuItem onClick={closeMenu}>
            <MenuIcon className={classes.menuIcon} />
            My Circuits
          </MenuItem>
        </Link>
        <Link to='/account' className={classes.menuLink}>
          <MenuItem onClick={closeMenu}>
            <PersonIcon className={classes.menuIcon} />
            Account
          </MenuItem>
        </Link>
        <Link to='/settings' className={classes.menuLink}>
          <MenuItem onClick={closeMenu}>
            <SettingsIcon className={classes.menuIcon} />
            Settings
          </MenuItem>
        </Link>
        <Divider />
        <MenuItem onClick={closeMenu}>
          <ExitToAppIcon className={classes.menuIcon} />
          Logout
        </MenuItem>
      </Menu>
    </AppBar>
  );
};
