import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// Custom components
import { CircuitCard } from '../../components/CircuitCard';
import { NewCircuitCard } from '../../components/NewCircuitCard';

// Material-UI
import { Typography, Grid, Container } from '@material-ui/core';
import { useStyles } from './Circuits.styles';

export const Circuits = () => {
  const classes = useStyles();
  const [circuits, setCircuits] = useState([]);

  // Fetch all the circuits
  const fetchCircuits = useCallback(async () => {
    try {
      const { data } = await axios.get('/api/circuits');
      setCircuits(data);
    } catch (err) {
      console.error(err);
    }
  }, [setCircuits]);

  // Adds a new circuit ot the database
  const createCircuit = useCallback(async () => {
    try {
      await axios.post('/api/circuits');
      fetchCircuits();
    } catch (err) {
      console.error(err);
    }
  }, [fetchCircuits]);

  // Deletes a circuit from the database
  const deleteCircuit = useCallback(
    async (id) => {
      try {
        await axios.delete(`/api/circuits?id=${id}`);
        fetchCircuits();
      } catch (err) {
        console.error(err);
      }
    },
    [fetchCircuits],
  );

  const exportCircuit = useCallback(() => {}, []);

  // Fetch all circuits when the page loads
  useEffect(() => {
    fetchCircuits();
  }, [fetchCircuits]);

  return (
    <Container className={classes.root}>
      <div className={classes.header}>
        <Typography variant='h4'>Your Circuits</Typography>
        <Typography>
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
    </Container>
  );
};
