import React, { useState, useCallback } from 'react';
import lodash from 'lodash';

import { compData } from './compData.js';

// Material-UI
import {
  Typography,
  Drawer,
  Toolbar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  InputAdornment,
  Tooltip,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useStyles } from './CompLib.styles';

export const CompLib = () => {
  const classes = useStyles();
  const [comps, setComps] = useState(compData);

  /**
   * Component filtering
   */
  const handleFiltering = useCallback(
    (event) => {
      setComps((comps) => {
        // Do a deep copy of the original array of components
        let filtered = lodash.cloneDeep(comps);

        // Filter the array and re-render it
        const searchBar = event.target.value;
        filtered.filter((menu) => {
          // Remove the components that don't match the filter
          menu.items = menu.items.filter((item) =>
            item.name.toLowerCase().includes(searchBar.toLowerCase()),
          );

          // Remove the menus that get emptied
          return menu.items.length;
        });

        return filtered;
      });
    },
    [setComps],
  );

  return (
    <>
      <Drawer
        variant='permanent'
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
        open={false}
      >
        <Toolbar /> {/* Push the content down by the size of a Toolbar */}
        <div className={classes.drawerContainer}>
          <div className={classes.drawerHeader}>
            <Typography className={classes.drawerTitle} variant='h5' noWrap>
              Components
            </Typography>
            <TextField
              variant='outlined'
              margin='dense'
              label='Search'
              placeholder='Resistor'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              onChange={handleFiltering}
            />
          </div>

          <div className={classes.drawerContent}>
            {comps?.map((menu) => (
              <Accordion key={menu.title}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{menu.title}</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.compGroup}>
                  {menu.items.map((item) => (
                    <Tooltip title={item.name} key={item.name} arrow>
                      <div className={classes.comp}>{item.Element}</div>
                    </Tooltip>
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
