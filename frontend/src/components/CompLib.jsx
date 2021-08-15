import React, { useState } from "react";
import lodash from "lodash";
import { compData } from "../data/compData.js";

// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import Tooltip from "@material-ui/core/Tooltip";

const drawerWidth = 300;
const compSize = 65;
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    display: "flex",
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflowY: "auto",
    flexGrow: 1,
  },
  drawerHeader: {
    margin: theme.spacing(2),
  },
  drawerTitle: {
    marginBottom: theme.spacing(2),
  },
  compGroup: {
    display: "flex",
    flexWrap: "wrap",
  },
  comp: {
    width: compSize,
    height: compSize,
    margin: theme.spacing(1),
  },
}));

function CompLib() {
  const classes = useStyles();
  const [comps, setComps] = useState(compData);

  /**
   * Component filtering
   */
  function handleFiltering(event) {
    setComps((comps) => {
      // Do a deep copy of the original array of components
      let filtered = lodash.cloneDeep(comps);

      // Filter the array and re-render it
      const searchBar = event.target.value;
      filtered.filter((menu) => {
        // Remove the components that don't match the filter
        menu.items = menu.items.filter((item) =>
          item.name.toLowerCase().includes(searchBar.toLowerCase())
        );

        // Remove the menus that get emptied
        return menu.items.length;
      });
    });
  }

  return (
    <>
      <Drawer
        variant="permanent"
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
        open={false}
      >
        <Toolbar /> {/* Push the content down by the size of a Toolbar */}
        <div className={classes.drawerContainer}>
          <div className={classes.drawerHeader}>
            <Typography className={classes.drawerTitle} variant="h5" noWrap>
              Components
            </Typography>
            <TextField
              variant="outlined"
              margin="dense"
              label="Search"
              placeholder="Resistor"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
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
                  {menu.items?.map?.((item) => (
                    <Tooltip title={item.name} key={item.name} arrow>
                      <div className={classes.comp}>{item.icon}</div>
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
}

export default CompLib;
