import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  container: {
    padding: theme.spacing(2),
  },
  header: {
    marginBottom: theme.spacing(4),
  },
}));
