import { makeStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    height: 300,
    backgroundColor: grey[50],
  },
  actionArea: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  placeHolderImage: {
    flexGrow: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'grey',
  },
  link: {
    textDecoration: 'none',
    color: grey[900],
  },
}));
