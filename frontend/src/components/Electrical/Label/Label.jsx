import { useMemo } from 'react';

import { useGlobalRefMap } from '../../../hooks';
import { DraggableComponent } from '..';
import { Typography, Box } from '@mui/material';

export function Label({
  owner,
  canvasRef,
  position,
  gridSize,
  updatePosition,
  name,
  value,
  unit,
  ...rest
}) {
  const refMap = useGlobalRefMap();
  const labelID = useMemo(() => `${owner}-label`, [owner]);

  return (
    <DraggableComponent
      position={position}
      nodeRef={refMap(labelID)}
      onDrag={(_e, position) => updatePosition(owner, position, true)}
      {...rest}
    >
      <Box
        sx={{
          padding: '5px',
          '&:hover': {
            transform: 'scale(1.1)',
          },
        }}
      >
        <Typography sx={{ height: 20 }}>
          <b>
            {name}
            {value && unit && ` = ${value} ${unit}`}
          </b>
        </Typography>
      </Box>
    </DraggableComponent>
  );
}
