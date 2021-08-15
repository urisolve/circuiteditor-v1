import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  sidebar: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
  },
  canvas: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
}));
