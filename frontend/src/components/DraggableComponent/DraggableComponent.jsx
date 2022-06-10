import { useRef } from 'react';
import Draggable from 'react-draggable';

import { Box } from '@mui/material';
import { constants } from '../../constants';

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
      bounds={bounds ?? '.schematic'}
      grid={[
        gridSize ?? constants.DEFAULT_GRID_SIZE,
        gridSize ?? constants.DEFAULT_GRID_SIZE,
      ]}
      handle={handle}
      nodeRef={draggableRef}
      positionOffset={{ x: 5, y: 5 }}
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
