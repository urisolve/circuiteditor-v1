import React from "react";

// Custom components
import PersonalInfo from "../components/PersonalInfo";
import Settings from "../components/Settings";

// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  item: {
    maxWidth: theme.spacing(75),
    margin: theme.spacing(5),
  },
}));

function Account({ toggleTheme }) {
  const classes = useStyles();

  return (
    <Grid container direction="row" justify="center" alignItems="flex-start">
      <Grid className={classes.item} item xs={12} md={6}>
        <PersonalInfo />
      </Grid>
      <Grid className={classes.item} item xs={12} md={6}>
        <Settings />
      </Grid>
    </Grid>
  );
}

export default Account;
