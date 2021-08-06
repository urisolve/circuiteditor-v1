import React from "react";

// Custom components
import Login from "../components/Login";
import Signup from "../components/Signup";

// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  item: {
    maxWidth: theme.spacing(75),
    margin: theme.spacing(5),
  },
}));

function Auth({ setUser }) {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="flex-start"
      spacing={1}
    >
      <Grid className={classes.item} item xs={12} md={6}>
        <Login setUser={setUser} />
      </Grid>
      <Grid className={classes.item} item xs={12} md={6}>
        <Signup />
      </Grid>
    </Grid>
  );
}

export default Auth;
