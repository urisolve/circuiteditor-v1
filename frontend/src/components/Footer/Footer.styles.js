import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  footer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3F51B5',
    color: 'white',
    padding: theme.spacing(2),
  },
}));
