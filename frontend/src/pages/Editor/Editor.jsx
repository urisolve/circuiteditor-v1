import React from 'react';
import { useSchematic } from 'react-circuit-schematics';

// Custom components
import { CompLib } from '../../components/CompLib';
import { ToolsMenu } from '../../components/ToolsMenu';
import { Canvas } from '../../components/Canvas';
import { defaultCircuit } from './defaultCircuit';

// Material-UI
import { Stack } from '@mui/material';

export const Editor = ({ ...rest }) => {
  const { schematic, history, selection } = useSchematic(defaultCircuit);

  return (
    <Stack direction='row' sx={{ flexGrow: 1 }}>
      <CompLib addToSchematic={schematic.add} />
      <Stack direction='column' sx={{ flexGrow: 1 }}>
        <ToolsMenu
          schematic={schematic}
          history={history}
          selection={selection}
        />
        <Canvas schematic={schematic} selection={selection} {...rest} />
      </Stack>
    </Stack>
  );
};
