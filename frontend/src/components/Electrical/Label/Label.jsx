import { createElement, useRef } from 'react';
import { Box } from '@mui/material';

import { DraggableComponent } from '..';

export function Label({
  as,
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
  const draggableRef = useRef();

  return (
    <DraggableComponent
      handle='.label-handle'
      position={position}
      nodeRef={draggableRef}
      onDrag={(_e, position) =>
        updatePosition?.(owner, position ?? { x: 0, y: 0 }, true)
      }
      {...rest}
    >
      <Box
        className='label-handle'
        ref={draggableRef}
        sx={{
          userSelect: 'none',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        {as ? (
          createElement(as, rest)
        ) : (
          <b>
            {name}
            {value && unit && ` = ${value} ${unit}`}
          </b>
        )}
      </Box>
    </DraggableComponent>
  );
}
