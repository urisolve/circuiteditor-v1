import { Box } from '@mui/system';
import Draggable from 'react-draggable';

export function DraggableComponent({
  nodeRef,
  bounds,
  handle,
  gridSize,
  isHandle,
  sx,
  children,
  ...rest
}) {
  return (
    <Draggable
      nodeRef={nodeRef}
      bounds={bounds ?? '.schematic'}
      handle={handle}
      grid={[gridSize ?? 10, gridSize ?? 10]}
      {...rest}
    >
      <Box
        ref={nodeRef}
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
