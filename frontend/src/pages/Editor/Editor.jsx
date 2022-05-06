import { useRef } from 'react';

import { Stack } from '@mui/material';

import {
  CompLib,
  QuickActionMenu,
  Schematic,
  SourceView,
} from '../../components';
import { SchematicContext } from '../../contexts';
import { useBoolean, useCircuit, useSchematic } from '../../hooks';

const canvasSize = { width: 2560, height: 1440 }; // 16:9 resolution (1440p)

export function Editor({ ...rest }) {
  const circuit = useCircuit();

  const schematic = useSchematic(circuit?.schematic);
  const canvasRef = useRef();

  const compLib = useBoolean(true);
  const sourceView = useBoolean(false);

  return (
    <SchematicContext.Provider value={schematic}>
      <Stack
        alignItems='center'
        justifyContent='center'
        sx={{
          ...canvasSize,
          background: 'radial-gradient(#fff, #eee)',
        }}
      >
        <Schematic
          canvasRef={canvasRef}
          selection={schematic.selection}
          {...rest}
        />

        <QuickActionMenu
          canvasRef={canvasRef}
          circuitName={circuit?.name ?? 'untitled'}
          compLib={compLib}
          sourceView={sourceView}
        />

        <CompLib controller={compLib} />

        <SourceView
          circuitName={circuit?.name ?? 'untitled'}
          controller={sourceView}
        />
      </Stack>
    </SchematicContext.Provider>
  );
}
