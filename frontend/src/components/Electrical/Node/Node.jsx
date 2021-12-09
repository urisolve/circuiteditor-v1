import { forwardRef, useRef } from 'react';
import { Box } from '@mui/system';

import { DraggableComponent } from '..';

export const Node = forwardRef(
  (
    {
      id,
      position,
      properties,
      gridSize,
      updatePosition,
      isSelected,
      reRender,
      ...rest
    },
    ref,
  ) => {
    const draggableRef = useRef();

    return (
      <DraggableComponent
        position={position}
        nodeRef={draggableRef}
        onDrag={(_e, position) => {
          updatePosition(id, position);
          reRender();
        }}
        {...rest}
      >
        <Box
          sx={{
            position: 'absolute',
            borderRadius: '50%',
            '&:hover': {
              transform: 'scale(1.25)',
            },

            // Given properties
            width: (properties?.radius ?? 5) * 2,
            height: (properties?.radius ?? 5) * 2,
            opacity: properties?.opacity ?? 1,
            backgroundColor: isSelected ? '#3475FF' : '#6495ED',
          }}
        >
          <Box ref={ref} sx={{ width: 1, height: 1 }} />
        </Box>
      </DraggableComponent>
    );
  },
);
