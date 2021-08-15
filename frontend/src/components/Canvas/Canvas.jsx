import React from 'react';
import { Schematic } from 'react-circuit-schematics';

// Material-UI
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  canvasHolder: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  canvas: {
    position: 'relative',
    width: '80%',
    height: '80%',
  },
}));

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
