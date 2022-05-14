import { useEffect, useCallback, useRef, useState } from 'react';
import lodash, { startCase } from 'lodash';
import axios from 'axios';

import { CircuitCard, SortingMenu, UploadFileInput } from '../../components';
import { useBoolean, useCollectionSort, useUser } from '../../hooks';
import { downloadCode } from '../../util';

import {
  Grid,
  Container,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Tooltip,
  CircularProgress,
  Box,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SortIcon from '@mui/icons-material/Sort';
import { readJsonFileAsync } from '../../util/file';

const FilterBy = Object.freeze({
  none: '_id',
  stared: 'isStared',
});

const OrderBy = Object.freeze({
  ascending: +1,
  descending: -1,
});

const SortBy = Object.freeze({
  alphabetically: 'name',
  created: 'createdAt',
  modified: 'updatedAt',
});

const getMenuItems = (enumObject) =>
  Object.entries(enumObject).map(([key, value]) => ({
    name: startCase(key),
    value,
  }));

export function Circuits() {
  const { user, setUser } = useUser();
  const isLoading = useBoolean(false);

  const sortMenu = useBoolean(false);
  const sortButton = useRef();

  const [filterBy, setFilterBy] = useState(FilterBy.none);
  const [orderBy, setOrderBy] = useState(OrderBy.ascending);
  const [sortBy, setSortBy] = useState(SortBy.modified);
  const sortParams = { filterBy, orderBy, sortBy };
  const circuits = useCollectionSort(user?.circuits, sortParams);

  const sortCategories = [
    {
      title: 'Filter By',
      items: getMenuItems(FilterBy),
      selected: filterBy,
      selector: setFilterBy,
    },
    {
      title: 'Order by',
      items: getMenuItems(OrderBy),
      selected: orderBy,
      selector: setOrderBy,
    },
    {
      title: 'Sort by',
      items: getMenuItems(SortBy),
      selected: sortBy,
      selector: setSortBy,
    },
  ];

  const fetchCircuits = useCallback(async () => {
    isLoading.on();

    try {
      const { data: circuits } = await axios.get('api/circuits');

      setUser((user) => ({ ...user, circuits }));
    } catch (error) {
      console.error(error);
    }

    isLoading.off();
  }, [isLoading, setUser]);

  async function createCircuit() {
    try {
      await axios.post('api/circuits');

      fetchCircuits();
    } catch (error) {
      console.error(error);
    }
  }

  async function uploadCircuit(file) {
    try {
      const schematic = await readJsonFileAsync(file);
      await axios.post('api/circuits', { schematic });

      fetchCircuits();
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteCircuit(id) {
    try {
      await axios.delete(`/api/circuits?id=${id}`);

      fetchCircuits();
    } catch (error) {
      console.error(error);
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
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchCircuits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container sx={{ mt: 2 }}>
      <Card variant='outlined' sx={{ mb: 2 }}>
        <CardHeader
          title='My Circuits'
          subheader='Here are all of the circuits that you have saved'
          action={
            <>
              <Tooltip title='Sort by' arrow>
                <IconButton onClick={sortMenu.open} ref={sortButton}>
                  <SortIcon fontSize='large' />
                </IconButton>
              </Tooltip>

              <Tooltip title='Upload schematic' arrow>
                <UploadFileInput
                  accept='application/json'
                  aria-label='Upload schematic'
                  iconProps={{ fontSize: 'large' }}
                  onUpload={uploadCircuit}
                />
              </Tooltip>

              <Tooltip title='New circuit' arrow>
                <IconButton onClick={createCircuit}>
                  <AddIcon fontSize='large' />
                </IconButton>
              </Tooltip>
            </>
          }
        />

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
              {circuits.map((circuit) => (
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
      </Card>

      <SortingMenu
        open={sortMenu.value}
        onClose={sortMenu.close}
        anchorEl={sortButton.current}
        categories={sortCategories}
      />
    </Container>
  );
}
