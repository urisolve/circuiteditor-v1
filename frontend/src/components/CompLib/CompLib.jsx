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
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useStyles } from './CompLib.styles';

export const CompLib = ({ addToSchematic, ...rest }) => {
  const classes = useStyles();
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
    <>
      <Drawer
        variant='permanent'
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
        open={false}
        {...rest}
      >
        <Toolbar /> {/* Push the content down by the size of a Toolbar */}
        <div className={classes.drawerContainer}>
          <div className={classes.drawerHeader}>
            <Typography className={classes.drawerTitle} variant='h5' noWrap>
              Components
            </Typography>
            <SearchBar value={searchBar} setter={setSearchBar} />
          </div>

          <div className={classes.drawerContent}>
            {filteredComps.map((menu) => (
              <Accordion key={menu.title}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{menu.title}</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.compGroup}>
                  {menu.items.map((item) => (
                    <Comp
                      key={item.name}
                      className={classes.comp}
                      onDoubleClick={() => addToSchematic?.(item.struct)}
                      {...item}
                    />
                  ))}
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </div>
      </Drawer>
    </>
  );
};
