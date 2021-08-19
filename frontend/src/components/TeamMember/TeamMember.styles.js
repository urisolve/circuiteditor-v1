import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  teamMember: {
    width: 200,
    paddingBottom: theme.spacing(5),
  },
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(20),
  },
}));
