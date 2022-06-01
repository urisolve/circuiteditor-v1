import { find } from 'lodash';
import { useEffect, useCallback, useRef, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
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
  favorites: 'isStared',
});

const OrderBy = Object.freeze({
  ascending: +1,
  descending: -1,
});

const SortBy = Object.freeze({
  alphabetically: 'name',
  createdAt: 'createdAt',
  modifiedAt: 'updatedAt',
});

export function Circuits() {
  const { t } = useTranslation();

  const { user, setUser } = useUser();
  const { enqueueSnackbar } = useSnackbar();
  const isLoading = useBoolean(false);

  const sortMenu = useBoolean(false);
  const sortButton = useRef();

  const [filterBy, setFilterBy] = useState(FilterBy.none);
  const [orderBy, setOrderBy] = useState(OrderBy.ascending);
  const [sortBy, setSortBy] = useState(SortBy.modifiedAt);
  const sortParams = { filterBy, orderBy, sortBy };
  const circuits = useCollectionSort(user?.circuits, sortParams);

  const sortCategories = [
    {
      title: t('common.filterBy'),
      items: FilterBy,
      selected: filterBy,
      selector: setFilterBy,
    },
    {
      title: t('common.orderBy'),
      items: OrderBy,
      selected: orderBy,
      selector: setOrderBy,
    },
    {
      title: t('common.sortBy'),
      items: SortBy,
      selected: sortBy,
      selector: setSortBy,
    },
  ];

  const fetchCircuits = useCallback(async () => {
    isLoading.on();

    try {
      const { data: circuits } = await axios.get('api/circuits');

      setUser((user) => ({ ...user, circuits }));
    } catch ({ response: { statusText } }) {
      enqueueSnackbar(statusText, { variant: 'error' });
    }

    isLoading.off();
  }, [enqueueSnackbar, isLoading, setUser]);

  async function createCircuit() {
    try {
      await axios.post('api/circuits');

      enqueueSnackbar(t('feedback.created'), { variant: 'success' });
      fetchCircuits();
    } catch ({ response: { statusText } }) {
      enqueueSnackbar(statusText, { variant: 'error' });
    }
  }

  async function loadCircuit(file) {
    try {
      const schematic = await readJsonFileAsync(file);

      await axios.post('api/circuits', {
        name: t('common.untitled'),
        schematic,
      });

      enqueueSnackbar(t('feedback.uploaded'), { variant: 'success' });
      fetchCircuits();
    } catch ({ response: { statusText } }) {
      enqueueSnackbar(statusText, { variant: 'error' });
    }
  }

  async function deleteCircuit(id) {
    try {
      await axios.delete(`/api/circuits?id=${id}`);

      enqueueSnackbar(t('feedback.deleted'), { variant: 'success' });
      fetchCircuits();
    } catch ({ response: { statusText } }) {
      enqueueSnackbar(statusText, { variant: 'error' });
    }
  }

  function downloadCircuit(id) {
    const { name, schematic } = find(user?.circuits, { _id: id });
    const code = JSON.stringify(schematic, null, 2);

    downloadCode(code, 'text/json', `${name}.json`);
  }

  async function starCircuit(id) {
    const circuit = find(user?.circuits, { _id: id });

    try {
      await axios.patch(`/api/circuits?id=${id}`, {
        isStared: !circuit.isStared,
        timestamps: false,
      });

      enqueueSnackbar(t('feedback.starred'), { variant: 'success' });
      fetchCircuits();
    } catch ({ response: { statusText } }) {
      enqueueSnackbar(statusText, { variant: 'error' });
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
          title={t('page.circuits.title')}
          subheader={t('page.circuits.subtitle')}
          action={
            <>
              <Tooltip title={t('common.sortBy')} arrow>
                <IconButton onClick={sortMenu.open} ref={sortButton}>
                  <SortIcon fontSize='large' />
                </IconButton>
              </Tooltip>

              <Tooltip title={t('common.load')} arrow>
                <UploadFileInput
                  accept='application/json'
                  iconProps={{ fontSize: 'large' }}
                  onUpload={loadCircuit}
                />
              </Tooltip>

              <Tooltip title={t('common.createNew')} arrow>
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
