import { useBoolean, useSchematic } from '../../hooks';
import { CompLib, QuickActionMenu, SourceView } from '../../components/UI';
import { Schematic } from '../../components/Electrical';
import { SchematicContext } from '../../contexts';

import { Stack } from '@mui/material';

const sidebarSize = 310;
const canvasSize = { width: 2560, height: 1440 }; // 16:9 resolution (1440p)

const defaultCircuit = require('../../circuits/voltageDivider.json');

export function Editor({ ...rest }) {
  const schematic = useSchematic(defaultCircuit);

  const compLib = useBoolean(false);
  const sourceView = useBoolean(false);

  return (
    <SchematicContext.Provider value={schematic}>
      <Stack
        alignItems='center'
        justifyContent='center'
        sx={{
          ...canvasSize,
          overflow: 'scroll',
          background: 'radial-gradient(#fff, #eee)',
        }}
      >
        <Schematic selection={schematic.selection} {...rest} />

        <QuickActionMenu
          offset={{ x: compLib.value ? sidebarSize : 0 }}
          anchor={{ bottom: 20, left: 20 }}
          compLib={compLib}
          sourceView={sourceView}
        />

        <CompLib controller={compLib} />
        <SourceView controller={sourceView} />
      </Stack>
    </SchematicContext.Provider>
  );
}
