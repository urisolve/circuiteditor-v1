import React from 'react';
import { useHistory } from 'react-router-dom';

import { Footer } from '../../components/Footer';

// SVGs from unDraw
import { ReactComponent as IntroSVG } from '../../assets/undraw/intro.svg';
import { ReactComponent as StepsSVG } from '../../assets/undraw/steps.svg';

// Team pictures
import mjf from '../../assets/team/mjf.png';
import fdp from '../../assets/team/fdp.png';
import txr from '../../assets/team/txr.png';
import sss from '../../assets/team/sss.png';

// Material-UI
import {
  Avatar,
  Button,
  Container,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import { useStyles } from './Home.styles';

// Data of the instruction steps
const steps = [
  'Create the schematic of the circuit.',
  'Choose the export protocol.',
  'Done!',
];

// Data of the team members
const members = [
  {
    name: 'Mário Alves',
    img: mjf,
  },
  {
    name: 'Francisco Pereira',
    img: fdp,
  },
  {
    name: 'André Rocha',
    img: txr,
  },
  {
    name: 'Lino Sousa',
    img: sss,
  },
  {
    name: 'Pedro Morim',
    img: '',
  },
];

/**
 * Introduction component.
 *
 * Simple and catchy introduction to the app.
 */
const Intro = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <section className={`${classes.section} ${classes.intro}`}>
      <Container>
        <Grid container spacing={10} alignItems='center'>
          <Grid item xs={12} md className={classes.slogan}>
            <Typography variant='h2' className={classes.title} align='left'>
              create circuit schematics
            </Typography>
            <Typography variant='h3' className={classes.subTitle} align='left'>
              and get their analytical model
            </Typography>
            <Button
              size='large'
              variant='contained'
              color='primary'
              classes={{ containedSizeLarge: classes.action }}
              onClick={() => history.push('/auth')}
            >
              Get Started
            </Button>
          </Grid>
          <Grid item xs={12} md>
            <div>
              <IntroSVG />
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

/**
 * Instruction component.
 *
 * Simple list of instructions on how to use the app.
 */
const Instructions = () => {
  const classes = useStyles();

  return (
    <section className={`${classes.section} ${classes.instructions}`}>
      <Container>
        <Grid container spacing={10} alignItems='center'>
          <Grid item xs={12} md={6}>
            <div>
              <StepsSVG />
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={10} justifyContent='center'>
              <Grid item>
                <Typography variant='h2'>Instructions</Typography>
              </Grid>
              <Grid item>
                {steps.map((step, id) => (
                  <div className={classes.step} key={id}>
                    <Typography
                      variant='h2'
                      color='primary'
                      className={classes.liSymbol}
                    >
                      {`${id + 1}`}
                    </Typography>
                    <Typography variant='h4'>{step}</Typography>
                  </div>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

/**
 * Team Member Component
 *
 * A component that fits an image and a name together.
 * Used to display the team members of the app.
 *
 * @param {Object} member An object that describes a user.
 *                        It uses the following schema:
 *                        { name: String, acronym: String }
 */
const TeamMember = ({ member }) => {
  const classes = useStyles();

  return (
    <div className={classes.teamMember}>
      <Grid
        container
        spacing={2}
        direction='column'
        alignItems='center'
        justifyContent='center'
      >
        <Grid item>
          <Avatar
            variant='rounded'
            className={classes.avatar}
            alt={member?.name}
            src={member?.img}
          />
        </Grid>
        <Grid item>
          <Typography variant='h6' color='textSecondary'>
            {member?.name}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

const ContactForm = () => {
  const classes = useStyles();

  return (
    <div className={classes.contactForm}>
      <form>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <TextField
              name='message'
              label='Message'
              placeholder='Describe the problem as well as you can...'
              variant='outlined'
              rows={10}
              multiline
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name='name'
              label='Name'
              placeholder='John Smith'
              autoComplete='given-name'
              variant='outlined'
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name='email'
              label='E-mail'
              placeholder='1210000@isep.ipp.pt'
              autoComplete='email'
              variant='outlined'
              fullWidth
            />
            <FormHelperText>
              We promise to not share your e-mail with third party services.
            </FormHelperText>
          </Grid>
          <Grid className={classes.formButton} item xs={12}>
            <Button color='primary' variant='outlined' size='large'>
              Send
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

/**
 * Contact Component
 *
 * Display the Contact information area.
 * It has a member list and a simple form.
 */
const Contact = () => {
  const classes = useStyles();

  return (
    <section className={`${classes.section} ${classes.contact}`}>
      <Container>
        <Grid container direction='column' alignItems='center' spacing={10}>
          <Grid item>
            <Typography variant='h2'>Contact</Typography>
          </Grid>
          <Grid item className={classes.team}>
            {members.map((member) => (
              <TeamMember member={member} key={member.name} />
            ))}
          </Grid>
          <Grid item xs={12}>
            <ContactForm />
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

/**
 * Home Page component
 *
 * The actual home page that displays all the other components above.
 * When users connect to the app they will be redirected here first.
 */
export const Home = () => {
  const classes = useStyles();

  return (
    <div className={classes.home}>
      <Intro />
      <Instructions />
      <Contact />
      <Footer />
    </div>
  );
};
