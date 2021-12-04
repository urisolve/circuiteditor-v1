import { useMemo } from 'react';

// Material-UI
import { Box } from '@mui/material';

import { useRefMap } from '../../../hooks';
import { DraggableComponent } from '..';

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
  const { setRef } = useRefMap();
  const labelID = useMemo(() => `${owner}-label`, [owner]);

  return (
    <DraggableComponent
      handle='.label-handle'
      position={position}
      nodeRef={setRef(labelID)}
      onDrag={(_e, position) => updatePosition(owner, position, true)}
      {...rest}
    >
      <Box
        className='label-handle'
        ref={setRef(labelID)}
        sx={{
          userSelect: 'none',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        <b>
          {name}
          {value && unit && ` = ${value} ${unit}`}
        </b>
      </Box>
    </DraggableComponent>
  );
}
