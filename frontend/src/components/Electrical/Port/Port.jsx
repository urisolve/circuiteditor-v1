import { forwardRef, useEffect, useMemo } from 'react';
import { Box } from '@mui/material';

import { rotateCoords } from '../../../util';
import { useGlobalRefMap } from '../../../hooks';

export const Port = forwardRef(
  ({ id, position, bounds, properties, rotation, ...rest }, ref) => {
    const refMap = useGlobalRefMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => () => refMap.remove(id), []);

    const realPos = useMemo(
      () => rotateCoords(position ?? { x: 0.5, y: 0.5 }, rotation ?? 0),
      [position, rotation],
    );

    return (
      <Box
        sx={{
          position: 'absolute',
          borderRadius: '50%',
          '&:hover': {
            transform: 'scale(1.25)',
          },

          // Given properties
          width: (properties?.radius ?? 6) * 2,
          height: (properties?.radius ?? 6) * 2,
          backgroundColor: properties?.color ?? '#bbb',

          // Positioning
          left: realPos.x * (bounds?.width ?? 100) - (properties?.radius ?? 6),
          top: realPos.y * (bounds?.height ?? 100) - (properties?.radius ?? 6),
        }}
        {...rest}
      >
        <Box ref={ref} sx={{ width: 1, height: 1 }} />
      </Box>
    );
  },
);
