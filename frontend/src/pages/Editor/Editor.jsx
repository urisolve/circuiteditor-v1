import React from 'react';
import { useSchematic } from 'react-circuit-schematics';

// Custom components
import { CompLib } from '../../components/CompLib';
import { ToolsMenu } from '../../components/ToolsMenu';
import { Canvas } from '../../components/Canvas';

// Material-UI
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  sidebar: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
  },
  canvas: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
}));

export const Editor = ({ ...rest }) => {
  const classes = useStyles();
  const { schematic, history, selection } = useSchematic();

  return (
    <div className={classes.sidebar}>
      <CompLib />
      <div className={classes.canvas}>
        <ToolsMenu history={history} selection={selection} />
        <Canvas schematic={schematic} selection={selection} {...rest} />
      </div>
    </div>
  );
};
