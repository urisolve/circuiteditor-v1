import { useEffect, useCallback, useMemo, useRef } from 'react';
import lodash from 'lodash';
import axios from 'axios';

// Custom components/hooks
import { CircuitCard, SortingMenu } from '../../components';
import { useBoolean, useSortAndOrder, useUser } from '../../hooks';

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
import { downloadCode } from '../../util';

export function Circuits() {
  const { user, setUser } = useUser();
  const isLoading = useBoolean(false);

  const showStared = useBoolean(false);

  const sortButton = useRef();
  const sortMenuOpen = useBoolean(false);
  const [sortedCircuits, params, setters] = useSortAndOrder(user?.circuits);

  const staredCircuits = useMemo(
    () => sortedCircuits.filter((circuit) => circuit.isStared),
    [sortedCircuits],
  );

  const fetchCircuits = useCallback(async () => {
    isLoading.on();

    try {
      const { data: circuits } = await axios.get('api/circuits');

      setUser((user) => ({ ...user, circuits }));
    } catch (err) {
      console.error(err);
    }

    isLoading.off();
  }, [isLoading, setUser]);

  async function uploadCircuit(circuit) {
    try {
      await axios.post('api/circuits', circuit);

      fetchCircuits();
    } catch (err) {
      console.error(err);
    }
  }

  async function createCircuit() {
    try {
      await axios.post('api/circuits');

      fetchCircuits();
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteCircuit(id) {
    try {
      await axios.delete(`/api/circuits?id=${id}`);

      fetchCircuits();
    } catch (err) {
      console.error(err);
    }
  }

  function downloadCircuit(id) {
    const { name, schematic } = lodash.find(user?.circuits, { _id: id });
    const code = JSON.stringify(schematic, null, 2);

    downloadCode(code, 'text/json', `${name}.json`);
  }

  async function starCircuit(id) {
    const circuit = lodash.find(user?.circuits, { _id: id });

    try {
      await axios.patch(`/api/circuits?id=${id}`, {
        isStared: !circuit.isStared,
        timestamps: false,
      });

      fetchCircuits();
    } catch (err) {
      console.error(err);
    }
  }

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
            <span>
              <IconButton onClick={uploadCircuit} disabled>
                <UploadIcon fontSize='large' />
              </IconButton>
            </span>
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
                        onDownload={() => downloadCircuit(circuit._id)}
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
}
