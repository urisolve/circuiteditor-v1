import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'center',
  },
  logo: {
    width: 50,
    fill: 'white',
  },
  title: {
    marginLeft: theme.spacing(2),
  },
  nav: {
    marginLeft: theme.spacing(4),
    flexGrow: 1,
    display: 'flex',
  },
  link: {
    marginLeft: theme.spacing(2),
    color: '#ddd',
    fontSize: theme.spacing(2),
    textDecoration: 'none',

    '&:hover': {
      color: 'white',
    },
  },
  action: {
    textDecoration: 'none',
    color: 'white',
  },
}));
