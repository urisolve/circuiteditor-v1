import { useCallback, useState } from 'react';

// Custom hooks & components
import { useSchematic } from '../../hooks';
import { CompLib, ToolsMenu, Canvas, SourceView } from '../../components/UI';
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
