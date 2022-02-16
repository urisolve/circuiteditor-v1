import { Box } from '@mui/material';

import { useGlobalRefMap } from '../../../hooks';

export function ConnectionPoint({ id, sx, ...rest }) {
  const refMap = useGlobalRefMap(id);

  return (
    <Box
      sx={{
        position: 'absolute',
        borderRadius: '50%',
        '&:hover': {
          transform: 'scale(1.25)',
        },

        ...sx,
      }}
      {...rest}
    >
      <Box
        ref={refMap.set(id)}
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
