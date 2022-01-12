import { useState, useMemo } from 'react';
import lodash from 'lodash';

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

// Custom component
import { MenuHeader } from '..';
import { library } from '../../../configs';

const sidebarWidth = 310;

export function CompLib({ addToSchematic, onClose, ...rest }) {
  const [searchBar, setSearchBar] = useState('');

  const filteredLib = useMemo(() => {
    // Do a deep copy of the original array of components
    const filtered = lodash.cloneDeep(library);

    // Filter the array and re-render it
    return filtered.filter((group) => {
      // Remove the components that don't match the filter
      group.items = group.items.filter((item) =>
        lodash.lowerCase(item.fullName).includes(searchBar.toLowerCase()),
      );

      // Remove the groups that get emptied
      return group.items.length > 0;
    });
  }, [searchBar]);

  return (
    <Drawer
      variant='persistent'
      sx={{
        width: sidebarWidth,
        display: 'flex',
        '& .MuiBox-root': {
          width: sidebarWidth,
        },
      }}
      ModalProps={{ keepMounted: true }} // Better performance on mobile.
      {...rest}
    >
      <Toolbar /> {/* Push the content down by the size of a Toolbar */}
      <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
        <Box sx={{ p: 2 }}>
          <MenuHeader onClose={onClose}>Components</MenuHeader>
          <SearchBar value={searchBar} setValue={setSearchBar} />
        </Box>

        <Box sx={{ p: 2 }}>
          {filteredLib.map((group) => (
            <Accordion variant='outlined' key={group.title}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{group.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack
                  direction='row'
                  justifyContent='flex-start'
                  align-items='flex-start'
                  sx={{ flexWrap: 'wrap' }}
                >
                  {group.items.map((item, idx) => (
                    <Comp
                      key={idx}
                      action={() => addToSchematic(item)}
                      {...item}
                    />
                  ))}
                </Stack>
              </AccordionDetails>
            </Accordion>
          ))}

          {filteredLib.length === 0 && (
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
