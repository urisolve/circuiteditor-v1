import { useCallback, useState } from 'react';
import { useSchematic } from 'react-circuit-schematics';

// Custom components
import { CompLib } from '../../components/CompLib';
import { ToolsMenu } from '../../components/ToolsMenu';
import { Canvas } from '../../components/Canvas';
import { SourceView } from '../../components/SourceView';
import { defaultCircuit } from './defaultCircuit';

// Material-UI
import { Stack } from '@mui/material';

export const Editor = ({ ...rest }) => {
  const { schematic, history, selection } = useSchematic(defaultCircuit);

  const [compLib, setCompLib] = useState(true);
  const [sourceView, setSourceView] = useState(false);
  const toggleCompLib = useCallback(
    () => setCompLib((compLib) => !compLib),
    [setCompLib],
  );
  const toggleSourceView = useCallback(
    () => setSourceView((sourceView) => !sourceView),
    [setSourceView],
  );

  return (
    <Stack direction='row' sx={{ flexGrow: 1 }}>
      <CompLib addToSchematic={schematic.add} />
      <Stack direction='column' sx={{ flexGrow: 1 }}>
        <ToolsMenu
          schematic={schematic}
          history={history}
          selection={selection}
          toggleSourceView={toggleSourceView}
        />
        <Canvas schematic={schematic} selection={selection} {...rest} />
      </Stack>
      <SourceView open={sourceView} schematic={schematic} />
    </Stack>
  );
};
