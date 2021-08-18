import { makeStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

const cardWidth = 300;
const cardHeight = 300;

export const useStyles = makeStyles((theme) => ({
  root: {
    width: cardWidth,
    height: cardHeight,
    backgroundColor: grey[50],
  },
  actionArea: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  placeHolderImage: {
    flexGrow: 1,
    width: cardWidth,
    height: cardHeight / 2,
    backgroundColor: 'grey',
  },
  link: {
    textDecoration: 'none',
    color: grey[900],
  },
  spacer: {
    flexGrow: 1,
  },
}));
