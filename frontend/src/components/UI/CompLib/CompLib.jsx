import { useState, useMemo, useContext } from 'react';
import lodash from 'lodash';

import { Comp } from '../Comp';
import { SearchBar } from '../SearchBar';

// Material-UI
import {
  Typography,
  Toolbar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Stack,
  SwipeableDrawer,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Custom component
import { MenuHeader } from '..';
import { library } from '../../../configs';
import { SchematicContext } from '../../../contexts';

const sidebarWidth = 310;

export function CompLib({ controller, ...rest }) {
  const { add: addToSchematic } = useContext(SchematicContext);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLib = useMemo(() => {
    const filtered = lodash.cloneDeep(library);

    return filtered.filter((group) => {
      group.elements = group.elements.filter((item) =>
        lodash.lowerCase(item.fullName).includes(searchQuery.toLowerCase()),
      );

      return !!group.elements.length;
    });
  }, [searchQuery]);

  return (
    <SwipeableDrawer
      variant='persistent'
      sx={{
        width: sidebarWidth,
        display: 'flex',
        '& .MuiBox-root': {
          width: sidebarWidth,
        },
      }}
      ModalProps={{ keepMounted: true }} // Better performance on mobile.
      open={controller.value}
      onClose={controller.off}
      onOpen={controller.on}
      {...rest}
    >
      <Toolbar /> {/* Push the content down by the size of a Toolbar */}
      <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
        <Box sx={{ p: 2 }}>
          <MenuHeader onClose={controller.off}>Components</MenuHeader>
          <SearchBar value={searchQuery} setValue={setSearchQuery} />
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
                  {group.elements.map((element, idx) => {
                    const comp = lodash.isFunction(element)
                      ? element()
                      : element;

                    return (
                      <Comp
                        key={idx}
                        action={() => addToSchematic(comp)}
                        {...comp}
                      />
                    );
                  })}
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
    </SwipeableDrawer>
  );
}
