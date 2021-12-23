import { useContext, useState } from 'react';

import { Box } from '@mui/material';

import { DraggableComponent } from '..';
import { useGlobalRefMap } from '../../../hooks';
import { SchematicContext } from '../../../contexts';

export function Node({
  id,
  position,
  properties,
  gridSize,
  updatePosition,
  isSelected,
  ...rest
}) {
  const refMap = useGlobalRefMap(id);

  const schematic = useContext(SchematicContext);
  const [startSch, setStartSch] = useState(schematic);

  return (
    <DraggableComponent
      position={position}
      onStart={() => setStartSch(schematic)}
      onDrag={(_e, { x, y }) => updatePosition(id, { x, y })}
      onStop={(_e, { x, y }) => updatePosition(id, { x, y }, startSch.data)}
      {...rest}
    >
      <Box
        sx={{
          position: 'absolute',
          borderRadius: '50%',
          '&:hover': {
            transform: 'scale(1.25)',
          },

          // Given properties
          width: (properties?.radius ?? 5) * 2,
          height: (properties?.radius ?? 5) * 2,
          opacity: properties?.opacity ?? 1,
          backgroundColor: isSelected ? '#3475FF' : '#6495ED',
        }}
      >
        <Box ref={refMap.set(id)} sx={{ width: 1, height: 1 }} />
      </Box>
    </DraggableComponent>
  );
}
