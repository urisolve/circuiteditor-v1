import React, { useState, useMemo } from 'react';
import lodash from 'lodash';

import { compData } from './compData';
import { Comp } from '../Comp';
import { SearchBar } from '../SearchBar';

// Material-UI
import {
  Typography,
  Drawer,
  Toolbar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Stack,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const drawerWidth = 310;

export const CompLib = ({ addToSchematic, ...rest }) => {
  const [searchBar, setSearchBar] = useState('');

  const filteredComps = useMemo(() => {
    // Do a deep copy of the original array of components
    const filtered = lodash.cloneDeep(compData);

    // Filter the array and re-render it
    return filtered.filter((menu) => {
      // Remove the components that don't match the filter
      menu.items = menu.items.filter((item) =>
        item.name.toLowerCase().includes(searchBar.toLowerCase()),
      );

      // Remove the menus that get emptied
      return menu.items.length;
    });
  }, [searchBar]);

  return (
    <Drawer
      variant='permanent'
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        display: 'flex',
        '& .MuiBox-root': {
          width: drawerWidth,
        },
      }}
      {...rest}
    >
      <Toolbar /> {/* Push the content down by the size of a Toolbar */}
      <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
        <Box sx={{ p: 2 }}>
          <Typography variant='h5' component='h2' gutterBottom noWrap>
            Components library
          </Typography>
          <SearchBar value={searchBar} setValue={setSearchBar} />
        </Box>

        <Box sx={{ p: 2 }}>
          {filteredComps.map((menu) => (
            <Accordion variant='outlined'>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{menu.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack
                  direction='row'
                  justifyContent='flex-start'
                  align-items='flex-start'
                  sx={{ flexWrap: 'wrap' }}
                >
                  {menu.items.map((item) => (
                    <Comp
                      key={item.name}
                      onDoubleClick={() => addToSchematic?.(item.struct)}
                      {...item}
                    />
                  ))}
                </Stack>
              </AccordionDetails>
            </Accordion>
          ))}

          {filteredComps.length === 0 && (
            <>
              <Typography variant='h6' align='center' gutterBottom>
                Nothing found
              </Typography>
              <Typography variant='body1' align='center'>
                There are no components that match that name
              </Typography>
            </>
          )}
        </Box>
      </Box>
    </Drawer>
  );
};
