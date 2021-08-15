import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  canvasHolder: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  canvas: {
    position: 'relative',
    width: '80%',
    height: '80%',
  },
}));
