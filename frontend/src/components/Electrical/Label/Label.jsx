import { useMemo } from 'react';

import { useGlobalRefMap } from '../../../hooks';
import { DraggableComponent } from '..';
import { Typography } from '@mui/material';

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
  const labelID = useMemo(() => `${owner}-label`, [owner]);
  const refMap = useGlobalRefMap(labelID);

  return (
    <DraggableComponent
      position={position}
      onDrag={(_e, position) => updatePosition(owner, position, true)}
      {...rest}
    >
      <Typography
        ref={refMap.set(labelID)}
        sx={{
          height: 20,
          padding: '5px',
          '&:hover': {
            transform: 'scale(1.1)',
          },
        }}
      >
        <b>
          {name}
          {value && unit && ` = ${value} ${unit}`}
        </b>
      </Typography>
    </DraggableComponent>
  );
}
