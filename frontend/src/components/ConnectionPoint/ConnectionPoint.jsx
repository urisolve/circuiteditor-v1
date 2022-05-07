import { Box } from '@mui/material';

import { useGlobalRefMap } from '../../hooks';

export function ConnectionPoint({ id, isDragging, sx, ...rest }) {
  const refMap = useGlobalRefMap(id);

  return (
    <Box
      sx={{
        borderRadius: '50%',
        cursor: isDragging ? 'grabbing' : 'grab',
        position: 'absolute',
        ...sx,
      }}
      {...rest}
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
