import { Box } from '@mui/material';

import { useGlobalRefMap } from '../../hooks';
import { constants } from '../../constants';

export function ConnectionPoint({ id, sx, ...rest }) {
  const refMap = useGlobalRefMap(id);

  return (
    <Box
      sx={{
        position: 'absolute',
        borderRadius: '50%',
        pointerEvents: 'auto',

        '&:hover': {
          transform: `scale(${constants.SCHEMATIC_HOVER_SCALE})`,
        },

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
