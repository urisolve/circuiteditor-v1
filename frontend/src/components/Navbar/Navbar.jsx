import { useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import { useBoolean, useGravatar, useUser } from '../../hooks';
import { ReactComponent as Logo } from '../../assets/brand/logo.svg';

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
  Hidden,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import TranslateIcon from '@mui/icons-material/Translate';
import CheckIcon from '@mui/icons-material/Check';
import useMediaQuery from '@mui/material/useMediaQuery';

const menuLink = {
  color: 'black',
  textDecoration: 'none',
};

const languages = [
  { code: 'en', nativeName: 'English' },
  { code: 'pt', nativeName: 'Português' },
];

export function Navbar({ ...rest }) {
  const { i18n, t } = useTranslation();

  const { user, setUser } = useUser();
  const gravatar = useGravatar(user?.email);

  const translationMenuAnchorEl = useRef();
  const isTranslationMenuOpen = useBoolean(false);

  const userMenuAnchorEl = useRef();
  const isUserMenuOpen = useBoolean(false);

  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const sm = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  async function logOut() {
    try {
      await axios.get('api/auth/logout');

      history.push('/');
      setUser(null);
    } catch ({ response: { statusText } }) {
      enqueueSnackbar(statusText, { variant: 'error' });
    }
  }

  function handleChangeLanguage(language) {
    i18n.changeLanguage(language);
    isTranslationMenuOpen.off();
  }

  return (
    <>
      <AppBar
        position='fixed'
        color='primary'
        sx={{ width: 1, zIndex: (theme) => theme.zIndex.drawer + 1 }}
        {...rest}
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

              <Hidden smDown>
                <Typography
                  variant='h1'
                  noWrap
                  sx={{ ml: 2, fontSize: 24, fontWeight: 'regular' }}
                >
                  Circuit Editor
                </Typography>
              </Hidden>
            </Button>

            <Box sx={{ flexGrow: 1 }} />

            <IconButton
              ref={translationMenuAnchorEl}
              onClick={isTranslationMenuOpen.on}
            >
              <TranslateIcon />
            </IconButton>

            {user ? (
              sm ? (
                <Button
                  ref={userMenuAnchorEl}
                  onClick={isUserMenuOpen.on}
                  startIcon={
                    <Avatar
                      alt={t('common.fullName', {
                        given: user.firstName,
                        family: user.lastName,
                      })}
                      src={gravatar}
                    />
                  }
                  variant='contained'
                  color='primary'
                  disableElevation
                  disableFocusRipple
                  style={{ backgroundColor: 'transparent' }}
                >
                  {t('common.fullName', {
                    given: user.firstName,
                    family: user.lastName,
                  })}
                </Button>
              ) : (
                <IconButton ref={userMenuAnchorEl} onClick={isUserMenuOpen.on}>
                  <Avatar
                    alt={t('common.fullName', {
                      given: user.firstName,
                      family: user.lastName,
                    })}
                    src={gravatar}
                  />
                </IconButton>
              )
            ) : (
              <Button
                color='inherit'
                component={Link}
                sx={{ ml: 2, textDecoration: 'none' }}
                to='/auth'
                variant='outlined'
              >
                {t('common.login')}
              </Button>
            )}
          </Toolbar>
        </Container>

        <Menu
          anchorEl={userMenuAnchorEl.current}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={isUserMenuOpen.value}
          onClose={isUserMenuOpen.off}
          keepMounted
        >
          <MenuItem
            component={Link}
            to='/circuits'
            onClick={isUserMenuOpen.off}
            sx={menuLink}
          >
            <MenuIcon sx={{ mr: 2 }} />

            {t('link.circuits')}
          </MenuItem>

          <MenuItem
            component={Link}
            to='/account'
            onClick={isUserMenuOpen.off}
            sx={menuLink}
          >
            <PersonIcon sx={{ mr: 2 }} />

            {t('link.account')}
          </MenuItem>

          <MenuItem
            disabled
            component={Link}
            to='/settings'
            onClick={isUserMenuOpen.off}
            sx={menuLink}
          >
            <SettingsIcon sx={{ mr: 2 }} />

            {t('link.settings')}
          </MenuItem>

          <Divider />

          <MenuItem
            onClick={() => {
              isUserMenuOpen.off();
              logOut();
            }}
          >
            <ExitToAppIcon sx={{ mr: 2 }} />

            {t('common.logout')}
          </MenuItem>
        </Menu>

        <Menu
          anchorEl={translationMenuAnchorEl.current}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={isTranslationMenuOpen.value}
          onClose={isTranslationMenuOpen.off}
          keepMounted
        >
          {languages.map(({ code, nativeName }) => (
            <MenuItem
              key={code}
              onClick={() => handleChangeLanguage(code)}
              sx={menuLink}
            >
              {i18n.language.includes(code) && (
                <CheckIcon sx={{ position: 'absolute' }} />
              )}

              <Typography sx={{ ml: 4 }}>{nativeName}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </AppBar>

      <Toolbar />
    </>
  );
}
