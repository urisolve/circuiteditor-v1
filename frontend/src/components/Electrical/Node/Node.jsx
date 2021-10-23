import { forwardRef, useRef } from 'react';
import Draggable from 'react-draggable';
import { Box } from '@mui/system';

export const Node = forwardRef(
  (
    {
      id,
      position,
      properties,
      gridSize,
      updatePosition,
      isSelected,
      isSelecting,
      ...rest
    },
    ref,
  ) => {
    const draggableRef = useRef();

    return (
      <Draggable
        handle='.node-handle'
        bounds='.schematic'
        position={position ?? { x: 0, y: 0 }}
        nodeRef={draggableRef}
        grid={[gridSize ?? 10, gridSize ?? 10]}
        onStop={(_e, position) =>
          updatePosition?.(id, position ?? { x: 0, y: 0 })
        }
        {...rest}
      >
        <Box
          className='node-handle'
          ref={draggableRef}
          sx={{
            position: 'absolute',
            borderRadius: '50%',
            '&:hover': {
              transform: 'scale(1.25)',
            },

            // Given properties
            width: (properties?.radius ?? 6) * 2,
            height: (properties?.radius ?? 6) * 2,
            opacity: properties?.opacity ?? 1,
            backgroundColor: (isSelected || isSelecting) && '#3475FF',
          }}
        >
          <Box ref={ref} sx={{ width: 1, height: 1 }} />
        </Box>
      </Draggable>
    );
  },
);
