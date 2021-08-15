import { makeStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    height: 300,
    backgroundColor: grey[50],
    border: `15px dashed ${grey[400]}`,
  },
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
  },
}));
