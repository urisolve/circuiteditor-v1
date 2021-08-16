import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  footer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2F2E41',
    color: '#ddd',
    padding: theme.spacing(2),
  },
}));
