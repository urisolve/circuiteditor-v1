import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import lodash from 'lodash';
import axios from 'axios';

// Custom components/hooks
import { CircuitCard } from '../../components/UI/CircuitCard';
import { SortingMenu } from '../../components/UI/SortingMenu';
import { useSortAndOrder } from '../../hooks/useSortAndOrder';

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
  CircularProgress,
  Box,
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddIcon from '@mui/icons-material/Add';
import UploadIcon from '@mui/icons-material/Publish';
import SortIcon from '@mui/icons-material/Sort';

export const Circuits = () => {
  const [circuits, setCircuits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [showStared, setShowStared] = useState(false);
  const toggleShowStared = () => setShowStared((showStared) => !showStared);

  const sortButton = useRef();
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [sortedCircuits, params, setters, options] = useSortAndOrder(circuits);

  // Filters the stared circuits
  const staredCircuits = useMemo(
    () => sortedCircuits.filter((circuit) => circuit.isStared),
    [sortedCircuits],
  );

  // Fetch all the circuits
  const fetchCircuits = useCallback(async () => {
    setIsLoading(true);

    try {
      const { data } = await axios.get('/api/circuits');
      setCircuits(data);
    } catch (err) {
      console.error(err);
    }

    setIsLoading(false);
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
          <Tooltip title='Sort' arrow>
            <IconButton onClick={() => setSortMenuOpen(true)} ref={sortButton}>
              <SortIcon fontSize='large' />
            </IconButton>
          </Tooltip>
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
    <Container sx={{ mt: 2 }}>
      {menus.map((menu) => (
        <Card key={menu.title} variant='outlined' sx={{ mb: 2 }}>
          <CardHeader
            title={menu.title}
            subheader={menu.subheader}
            action={menu.action}
          />

          <Collapse in={menu?.collapse ?? true} timeout='auto' unmountOnExit>
            <CardContent>
              {isLoading ? (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
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
              )}
            </CardContent>
          </Collapse>
        </Card>
      ))}

      <SortingMenu
        open={sortMenuOpen}
        onClose={() => setSortMenuOpen(false)}
        anchorEl={sortButton.current}
        params={params}
        setters={setters}
        options={options}
      />
    </Container>
  );
};
