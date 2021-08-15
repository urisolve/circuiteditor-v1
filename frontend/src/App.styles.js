import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: 10,
      height: 10,
    },
    '*::-webkit-scrollbar-track': {
      background: 'white',
    },
    '*::-webkit-scrollbar-thumb': {
      background: 'grey',
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
