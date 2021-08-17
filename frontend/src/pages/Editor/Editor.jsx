import React from 'react';
import { useSchematic } from 'react-circuit-schematics';

// Custom components
import { CompLib } from '../../components/CompLib';
import { ToolsMenu } from '../../components/ToolsMenu';
import { Canvas } from '../../components/Canvas';
import { defaultCircuit } from './defaultCircuit';

// Material-UI
import { useStyles } from './Editor.styles';

export const Editor = ({ ...rest }) => {
  const classes = useStyles();
  const { schematic, history, selection } = useSchematic(defaultCircuit);

  return (
    <div className={classes.sidebar}>
      <CompLib addToSchematic={schematic.add} />
      <div className={classes.canvas}>
        <ToolsMenu
          schematic={schematic}
          history={history}
          selection={selection}
        />
        <Canvas schematic={schematic} selection={selection} {...rest} />
      </div>
    </div>
  );
};
