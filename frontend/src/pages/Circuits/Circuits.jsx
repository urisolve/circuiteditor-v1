import React, { useState, useEffect, useCallback, useMemo } from 'react';
import lodash from 'lodash';
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

  const sortedCircuits = useMemo(
    () =>
      circuits.sort(
        (a, b) =>
          (a.updatedAt < b.updatedAt) * 1 + (a.updatedAt > b.updatedAt) * -1,
      ),
    [circuits],
  );

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

  const starCircuit = useCallback(
    async (id) => {
      const circuit = lodash.find(circuits, { _id: id });
      const newCircuit = {
        ...circuit,
        isStared: !circuit.isStared,
        timestamps: false,
      };

      try {
        await axios.patch(`/api/circuits?id=${id}`, newCircuit);
        fetchCircuits();
      } catch (err) {
        console.error(err);
      }
    },
    [fetchCircuits, circuits],
  );

  // Fetch all circuits when the page loads
  useEffect(() => {
    fetchCircuits();
  }, [fetchCircuits]);

  return (
    <Container className={classes.root}>
      <div className={classes.header}>
        <Typography variant='h4'>All Circuits</Typography>
        <Typography>
          Here you can find all of the circuits that you have saved.
        </Typography>
      </div>

      <Grid
        container
        spacing={2}
        justifyContent='center'
        alignItems='flex-start'
      >
        {sortedCircuits?.map((circuit) => (
          <Grid key={circuit._id} item>
            <CircuitCard
              circuit={circuit}
              onDelete={() => deleteCircuit(circuit._id)}
              onStar={() => starCircuit(circuit._id)}
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
