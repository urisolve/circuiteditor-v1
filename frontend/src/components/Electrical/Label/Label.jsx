// Material-UI
import { Box } from '@mui/material';

import { useRefMap } from '../../../hooks';
import { DraggableComponent } from '..';

export function Label({
  id,
  canvasRef,
  owner,
  position,
  gridSize,
  updatePosition,
  name,
  value,
  unit,
  ...rest
}) {
  const { setRef } = useRefMap();

  return (
    <DraggableComponent
      handle='.label-handle'
      position={position}
      nodeRef={setRef(id)}
      onDrag={(_e, position) => updatePosition(owner, position, true)}
      {...rest}
    >
      <Box
        className='label-handle'
        ref={setRef(id)}
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
