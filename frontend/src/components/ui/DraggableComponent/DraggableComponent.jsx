import { useRef } from 'react';
import Draggable from 'react-draggable';

import { Box } from '@mui/material';

export function DraggableComponent({
  bounds,
  handle,
  gridSize,
  isHandle,
  sx,
  children,
  ...rest
}) {
  const draggableRef = useRef();

  return (
    <Draggable
      nodeRef={draggableRef}
      bounds={bounds ?? '.schematic'}
      handle={handle}
      grid={[gridSize ?? 10, gridSize ?? 10]}
      {...rest}
    >
      <Box
        ref={draggableRef}
        sx={{
          position: 'absolute',
          userSelect: 'none',
          top: 0,
          left: 0,
          ...sx,
        }}
      >
        {children}
      </Box>
    </Draggable>
  );
}
