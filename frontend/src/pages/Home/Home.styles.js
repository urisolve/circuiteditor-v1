import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  home: {
    flexGrow: 1,
  },
  intro: {
    display: 'flex',
    padding: `
      ${theme.spacing(20)}px 
      ${theme.spacing(10)}px 
      ${theme.spacing(20)}px 
      ${theme.spacing(10)}px 
    `,
  },
  slogan: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(5),
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
    padding: `
      ${theme.spacing(20)}px 
      ${theme.spacing(10)}px 
      ${theme.spacing(20)}px 
      ${theme.spacing(10)}px 
    `,
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
    padding: `
      ${theme.spacing(20)}px 
      ${theme.spacing(10)}px 
      ${theme.spacing(20)}px 
      ${theme.spacing(10)}px 
    `,
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
  footer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2F2E41',
    color: '#ddd',
    padding: theme.spacing(2),
  },
}));
