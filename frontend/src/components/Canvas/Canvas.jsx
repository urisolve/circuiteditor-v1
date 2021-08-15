import React from 'react';
import { Schematic } from 'react-circuit-schematics';

// Material-UI
import { useStyles } from './Canvas.styles';
import Paper from '@material-ui/core/Paper';

export const Canvas = ({ schematic, selection, ...rest }) => {
  const classes = useStyles();

  return (
    <div className={classes.canvasHolder}>
      <Paper id='canvas' elevation={3} className={classes.canvas}>
        <Schematic schematic={schematic} selection={selection} {...rest} />
      </Paper>
    </div>
  );
};
