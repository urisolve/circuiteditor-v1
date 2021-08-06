import React from "react";
import { useHistory } from "react-router-dom";

// SVGs from unDraw
import { ReactComponent as IntroSVG } from "../assets/undraw/intro.svg";
import { ReactComponent as StepsSVG } from "../assets/undraw/steps.svg";

// Team pictures
import mjf from "../assets/team/mjf.png";
import fdp from "../assets/team/fdp.png";
import txr from "../assets/team/txr.png";
import lino from "../assets/team/lino.png";

// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Button,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  home: {
    flexGrow: 1,
  },
  intro: {
    display: "flex",
    padding: `
      ${theme.spacing(20)}px 
      ${theme.spacing(10)}px 
      ${theme.spacing(20)}px 
      ${theme.spacing(10)}px 
    `,
  },
  slogan: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: theme.spacing(5),
  },
  action: {
    fontSize: theme.spacing(3),
  },
  instructions: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2F2E41",
    color: "#ddd",
    padding: `
      ${theme.spacing(20)}px 
      ${theme.spacing(10)}px 
      ${theme.spacing(20)}px 
      ${theme.spacing(10)}px 
    `,
  },
  step: {
    display: "flex",
    alignItems: "center",
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
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: `
      ${theme.spacing(20)}px 
      ${theme.spacing(10)}px 
      ${theme.spacing(20)}px 
      ${theme.spacing(10)}px 
    `,
  },
  team: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(20),
  },
  contactForm: {
    maxWidth: 800,
  },
  formButton: {
    display: "flex",
    justifyContent: "center",
  },
  footer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2F2E41",
    color: "#ddd",
    padding: theme.spacing(2),
  },
}));

// Data of the instruction steps
const steps = [
  "Create the schematic of the circuit.",
  "Choose the export protocol.",
  "Done!",
];

// Data of the team members
const members = [
  {
    name: "Mário Alves",
    img: mjf,
  },
  {
    name: "Francisco Pereira",
    img: fdp,
  },
  {
    name: "André Rocha",
    img: txr,
  },
  {
    name: "Lino Sousa",
    img: lino,
  },
  {
    name: "Pedro Morim",
    img: "",
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
    <section className={classes.intro}>
      <Grid container spacing={10} alignItems="center">
        <Grid item xs={12} md className={classes.slogan}>
          <Typography variant="h2" className={classes.title}>
            Convert circuit schematics into their analytical model
          </Typography>
          <Button
            size="large"
            variant="contained"
            color="primary"
            classes={{ containedSizeLarge: classes.action }}
            onClick={() => history.push("/auth")}
          >
            Start
          </Button>
        </Grid>
        <Grid item xs={12} md>
          <div>
            <IntroSVG />
          </div>
        </Grid>
      </Grid>
    </section>
  );
};

/**
 * Instruction component.
 *
 * Simple list of instructions on how to use the app.
 */
const Intructions = () => {
  const classes = useStyles();

  return (
    <section className={classes.instructions}>
      <Grid container spacing={10} alignItems="center">
        <Grid item xs={12} md={6}>
          <div>
            <StepsSVG />
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={10} justify="center">
            <Grid item>
              <Typography variant="h2">Instructions</Typography>
            </Grid>
            <Grid item>
              {steps.map((step, id) => (
                <div className={classes.step} key={id}>
                  <Typography
                    variant="h2"
                    color="primary"
                    className={classes.liSymbol}
                  >
                    {`${id + 1}`}
                  </Typography>
                  <Typography variant="h4">{step}</Typography>
                </div>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
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
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Grid item>
          <Avatar
            variant="rounded"
            className={classes.avatar}
            alt={member?.name}
            src={member?.img}
          />
        </Grid>
        <Grid item>
          <Typography variant="h6" color="textSecondary">
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
              name="message"
              label="Message"
              placeholder="Describe the problem as well as you can..."
              variant="outlined"
              rows={10}
              multiline
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="name"
              label="Name"
              placeholder="John Smith"
              autoComplete="given-name"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="email"
              label="E-mail"
              placeholder="1210000@isep.ipp.pt"
              autoComplete="email"
              variant="outlined"
              fullWidth
            />
            <FormHelperText>
              We promise to not share your e-mail with third party services.
            </FormHelperText>
          </Grid>
          <Grid className={classes.formButton} item xs={12}>
            <Button color="primary" variant="outlined" size="large">
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
    <section className={classes.contact}>
      <Grid container direction="column" alignItems="center" spacing={10}>
        <Grid item>
          <Typography variant="h2">Contact</Typography>
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
    </section>
  );
};

/**
 * Footer Component
 *
 * A simple footer to display the team name and the license of the app.
 */
const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Typography variant="body2">
        Copyright © 2021 Equipa URIsolve. All rights reserved.
      </Typography>
    </footer>
  );
};

/**
 * Home Page component
 *
 * The actual home page that displays all the other components above.
 * When users connect to the app they will be redirected here first.
 */
function Home() {
  const classes = useStyles();

  return (
    <div className={classes.home}>
      <Intro />
      <Intructions />
      <Contact />
      <Footer />
    </div>
  );
}

export default Home;
