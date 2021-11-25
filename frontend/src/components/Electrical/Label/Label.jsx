import useDynamicRefs from 'use-dynamic-refs';

// Material-UI
import { Box } from '@mui/material';

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
  const [getRef, setRef] = useDynamicRefs();

  return (
    <DraggableComponent
      handle='.label-handle'
      position={position}
      nodeRef={setRef(id)}
      onDrag={(_e, position) =>
        updatePosition?.(owner, position ?? { x: 0, y: 0 }, true)
      }
      {...rest}
    >
      <Box
        className='label-handle'
        ref={getRef(id)}
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
