import { makeStyles } from '@material-ui/core/styles';

const avatarSize = 200;

export const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
}));
