import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  divider: {
    height: 35,
    margin: `auto ${theme.spacing(1)}px`,
    backgroundColor: '#ddd',
  },
}));
