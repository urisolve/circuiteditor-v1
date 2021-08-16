import { makeStyles } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';

export const useStyles = makeStyles((theme) => ({
  home: {
    flexGrow: 1,
  },
  section: {
    padding: `
      ${theme.spacing(15)}px 
      ${theme.spacing(10)}px 
      ${theme.spacing(15)}px 
      ${theme.spacing(10)}px 
    `,
  },
  intro: {
    display: 'flex',
  },
  slogan: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  emphasis: {
    color: indigo[500],
  },
  title: {
    marginBottom: theme.spacing(2),
    fontSize: theme.spacing(7),
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#2F2E41',
  },
  subTitle: {
    marginBottom: theme.spacing(5),
    fontSize: theme.spacing(5),
    textTransform: 'uppercase',
    fontWeight: 'thin',
    color: '#2F2E41',
  },
  action: {
    fontSize: theme.spacing(3),
  },
  instructions: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2F2E41',
    color: '#ddd',
  },
  step: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
  },
  liSymbol: {
    marginRight: theme.spacing(5),
  },
  teamMember: {
    width: 200,
    paddingBottom: theme.spacing(5),
  },
  contact: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  team: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(20),
  },
  contactForm: {
    maxWidth: 800,
  },
  formButton: {
    display: 'flex',
    justifyContent: 'center',
  },
}));
