import { Box } from '@mui/material';

import { DraggableComponent } from '..';
import { useGlobalRefMap } from '../../../hooks';

export function Node({
  id,
  position,
  properties,
  gridSize,
  updatePosition,
  isSelected,
  reRender,
  ...rest
}) {
  const refMap = useGlobalRefMap(id);

  return (
    <DraggableComponent
      position={position}
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
        <Box ref={refMap.set(id)} sx={{ width: 1, height: 1 }} />
      </Box>
    </DraggableComponent>
  );
}
