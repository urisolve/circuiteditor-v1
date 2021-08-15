import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 300;
const compSize = 65;

export const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    display: 'flex',
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflowY: 'auto',
    flexGrow: 1,
  },
  drawerHeader: {
    margin: theme.spacing(2),
  },
  drawerTitle: {
    marginBottom: theme.spacing(2),
  },
  compGroup: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  comp: {
    width: compSize,
    height: compSize,
    margin: theme.spacing(1),
  },
}));
