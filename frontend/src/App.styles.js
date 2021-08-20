import { makeStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

export const useStyles = makeStyles((theme) => ({
  '@global': {
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
  },
  app: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    display: 'flex',
    flexGrow: 1,
  },
}));
