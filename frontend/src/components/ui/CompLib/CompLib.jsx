import { useState, useMemo, useContext } from 'react';
import lodash from 'lodash';

import { Comp } from '../Comp';
import { SearchBar } from '../SearchBar';

import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Grid,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ListAltIcon from '@mui/icons-material/ListAlt';

import { MenuHeader } from '..';
import { library } from './library';
import { SchematicContext } from '../../../contexts';
import { Drawer } from '../Drawer';

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
    <Drawer controller={controller} {...rest}>
      <Box>
        <MenuHeader icon={<ListAltIcon />} onClose={controller.off}>
          Components
        </MenuHeader>

        <SearchBar value={searchQuery} setValue={setSearchQuery} />
      </Box>

      <Box>
        {filteredLib.map((group) => (
          <Accordion variant='outlined' key={group.title}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{group.title}</Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Grid container>
                {group.elements.map((element, idx) => {
                  const comp = lodash.isFunction(element) ? element() : element;

                  return (
                    <Grid key={idx} xs={4} item>
                      <Comp action={() => addToSchematic(comp)} {...comp} />
                    </Grid>
                  );
                })}
              </Grid>
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
    </Drawer>
  );
}
