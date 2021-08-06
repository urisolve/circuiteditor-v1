import React, { useState, useEffect } from "react";
import axios from "axios";

// Custom components
import CircuitCard from "../components/CircuitCard";
import NewCircuitCard from "../components/NewCircuitCard";

// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  container: {
    padding: theme.spacing(2),
  },
  header: {
    marginBottom: theme.spacing(4),
  },
}));

function Circuits() {
  const classes = useStyles();
  const [circuits, setCircuits] = useState([]);

  // Fetch all the circuits
  async function fetchCircuits() {
    await axios.get("/api/circuits/").then((res) => setCircuits(res.data));
  }

  // Adds a new circuit ot the database
  async function createCircuit() {
    await axios.post("/api/circuits").then(fetchCircuits);
  }

  // Deletes a circuit from the database
  async function deleteCircuit(id) {
    await axios.delete(`/api/circuits?id=${id}`).then(fetchCircuits);
  }

  function exportCircuit() {}

  // Fetch all circuits when the page loads
  useEffect(() => {
    fetchCircuits();
  }, []);

  return (
    <div className={classes.root}>
      <Paper className={classes.container} elevation={3}>
        <div className={classes.header}>
          <Typography variant="h5">My Circuits</Typography>
          <Typography variant="body1">
            Here you can find the circuits that you have saved.
          </Typography>
        </div>

        <Grid container spacing={2}>
          {circuits?.map((circuit) => (
            <Grid key={circuit._id} item>
              <CircuitCard
                circuit={circuit}
                onDelete={() => deleteCircuit(circuit._id)}
                onExport={exportCircuit}
              />
            </Grid>
          ))}

          <Grid item>
            <NewCircuitCard onClick={createCircuit} />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default Circuits;
