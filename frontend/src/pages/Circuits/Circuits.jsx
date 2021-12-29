import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import lodash from 'lodash';
import axios from 'axios';

// Custom components/hooks
import { CircuitCard, SortingMenu } from '../../components/UI';
import { useBoolean, useSortAndOrder } from '../../hooks';

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

export function Circuits() {
  const [circuits, setCircuits] = useState([]);
  const isLoading = useBoolean(false);

  const showStared = useBoolean(false);

  const sortButton = useRef();
  const sortMenuOpen = useBoolean(false);
  const [sortedCircuits, params, setters] = useSortAndOrder(circuits);

  // Filters the stared circuits
  const staredCircuits = useMemo(
    () => sortedCircuits.filter((circuit) => circuit.isStared),
    [sortedCircuits],
  );

  // Fetch all the circuits
  const fetchCircuits = useCallback(async () => {
    isLoading.on();

    try {
      const { data } = await axios.get('api/circuits');
      setCircuits(data);
    } catch (err) {
      console.error(err);
    }

    isLoading.off();
  }, [setCircuits, isLoading]);

  // Let the user upload a new circuit schematic
  const uploadCircuit = useCallback(
    async (circuit) => {
      try {
        await axios.post('api/circuits', circuit);
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
      await axios.post('api/circuits');
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Data to build the menus
  const menus = [
    {
      title: 'Favorite Circuits',
      subheader: 'Star a circuit for it to appear here',
      iterable: staredCircuits,
      action: (
        <Tooltip
          title={showStared.value ? 'Hide favorites' : 'Show favorites'}
          arrow
        >
          <IconButton onClick={showStared.toggle}>
            {showStared.value ? (
              <ChevronDownIcon fontSize='large' />
            ) : (
              <ChevronRightIcon fontSize='large' />
            )}
          </IconButton>
        </Tooltip>
      ),
      collapse: showStared.value,
    },
    {
      title: 'All Circuits',
      subheader: 'Here are all of the circuits that you have saved',
      iterable: sortedCircuits,
      action: (
        <>
          <Tooltip title='Sort' arrow>
            <IconButton onClick={sortMenuOpen.on} ref={sortButton}>
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
              {isLoading.value ? (
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
        open={sortMenuOpen.value}
        onClose={sortMenuOpen.off}
        anchorEl={sortButton.current}
        params={params}
        setters={setters}
      />
    </Container>
  );
};
