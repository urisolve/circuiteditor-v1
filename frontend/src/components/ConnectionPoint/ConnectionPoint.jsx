import { Box } from '@mui/material';

import { useGlobalRefMap } from '../../hooks';
import { getDragHandleId } from '../../util';

export function ConnectionPoint({ id, isDragging, sx, ...rest }) {
  const refMap = useGlobalRefMap(id);
  const dragHandleId = getDragHandleId(id);

  return (
    <Box
      {...rest}
      ref={refMap.get(dragHandleId)}
      sx={{
        borderRadius: '50%',
        cursor: isDragging ? 'grabbing' : 'grab',
        position: 'absolute',
        ...sx,
      }}
    >
      <Box
        ref={refMap.get(id)}
        sx={{
          position: 'absolute',
          left: 'calc(50% - 1px)',
          top: 'calc(50% - 1px)',
          width: 2,
          height: 2,
        }}
      />
    </Box>
  );
}
