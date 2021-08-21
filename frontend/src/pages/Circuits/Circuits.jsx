import React, { useState, useEffect, useCallback, useMemo } from 'react';
import lodash from 'lodash';
import axios from 'axios';

// Custom components
import { CircuitCard } from '../../components/CircuitCard';

// Material-UI
import {
  Grid,
  Container,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Tooltip,
  Collapse,
} from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronDownIcon from '@material-ui/icons/KeyboardArrowDown';
import AddIcon from '@material-ui/icons/Add';
import UploadIcon from '@material-ui/icons/Publish';
import { useStyles } from './Circuits.styles';

export const Circuits = () => {
  const classes = useStyles();
  const [circuits, setCircuits] = useState([]);

  const [showStared, setShowStared] = useState(true);
  const toggleShowStared = () => setShowStared((showStared) => !showStared);

  // Builds the sorted circuits
  const sortedCircuits = useMemo(
    () =>
      circuits.sort(
        (a, b) =>
          (a.updatedAt < b.updatedAt) * 1 + (a.updatedAt > b.updatedAt) * -1,
      ),
    [circuits],
  );

  // Filters the stared circuits
  const staredCircuits = useMemo(
    () => sortedCircuits.filter((circuit) => circuit.isStared),
    [sortedCircuits],
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

  // Let the user upload a new circuit schematic
  const uploadCircuit = useCallback(
    async (circuit) => {
      try {
        await axios.post('/api/circuits', circuit);
        fetchCircuits();
      } catch (err) {
        console.error(err);
      }
    },
    [fetchCircuits],
  );

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

  // Adds a circuit to the favorites
  const starCircuit = useCallback(
    async (id) => {
      const circuit = lodash.find(circuits, { _id: id });

      try {
        await axios.patch(`/api/circuits?id=${id}`, {
          isStared: !circuit.isStared,
          timestamps: false,
        });
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

  // Data to build the menus
  const menus = [
    {
      title: 'Favorite Circuits',
      subheader: 'Star a circuit for it to appear here',
      iterable: staredCircuits,
      action: (
        <Tooltip title={showStared ? 'Hide favorites' : 'Show favorites'} arrow>
          <IconButton onClick={toggleShowStared}>
            {showStared ? (
              <ChevronDownIcon fontSize='large' />
            ) : (
              <ChevronRightIcon fontSize='large' />
            )}
          </IconButton>
        </Tooltip>
      ),
      collapse: showStared,
    },
    {
      title: 'All Circuits',
      subheader: 'Here are all of the circuits that you have saved',
      iterable: sortedCircuits,
      action: (
        <>
          <Tooltip title='Upload circuit' arrow>
            <IconButton onClick={uploadCircuit} disabled>
              <UploadIcon fontSize='large' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Create new circuit' arrow>
            <IconButton onClick={createCircuit}>
              <AddIcon fontSize='large' />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <Container className={classes.root}>
      {menus.map((menu) => (
        <Card key={menu.title} variant='outlined' className={classes.menu}>
          <CardHeader
            title={menu.title}
            subheader={menu.subheader}
            action={menu.action}
          />

          <Collapse in={menu?.collapse ?? true} timeout='auto' unmountOnExit>
            <CardContent>
              <Grid
                container
                spacing={2}
                justifyContent='flex-start'
                alignItems='flex-start'
              >
                {menu.iterable.map((circuit) => (
                  <Grid key={circuit._id} item>
                    <CircuitCard
                      circuit={circuit}
                      onDelete={() => deleteCircuit(circuit._id)}
                      onStar={() => starCircuit(circuit._id)}
                    />
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Collapse>
        </Card>
      ))}
    </Container>
  );
};
