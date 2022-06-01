import { useRef } from 'react';
import { useRouteMatch } from 'react-router-dom';

import { Stack } from '@mui/material';

import {
  CompLib,
  QuickActionMenu,
  Schematic,
  SourceView,
} from '../../components';
import { SchematicContext } from '../../contexts';
import { useBoolean, useSchematic, useUser } from '../../hooks';
import { constants } from '../../constants';

export function Editor({ ...rest }) {
  const { user } = useUser();
  const match = useRouteMatch();

  const circuitId = match.params.circuitId;
  const circuit = user?.circuits.find((circuit) => circuit._id === circuitId);

  const schematic = useSchematic(circuit?.schematic);

  const compLib = useBoolean(true);
  const sourceView = useBoolean(false);

  const canvasRef = useRef();
  const schematicRef = useRef();

  return (
    <SchematicContext.Provider value={schematic}>
      <Stack
        alignItems='center'
        justifyContent='center'
        sx={{
          width: constants.CANVAS_WIDTH,
          height: constants.CANVAS_HEIGHT,
          background: 'radial-gradient(#fff, #eee)',
        }}
      >
        <Schematic
          canvasRef={canvasRef}
          schematicRef={schematicRef}
          selection={schematic.selection}
          {...rest}
        />

        <QuickActionMenu
          schematicRef={schematicRef}
          circuitName={circuit?.name}
          compLib={compLib}
          sourceView={sourceView}
        />

        <CompLib controller={compLib} />

        <SourceView circuitName={circuit?.name} controller={sourceView} />
      </Stack>
    </SchematicContext.Provider>
  );
}
