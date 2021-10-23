import { forwardRef, useMemo } from 'react';
import PropTypes from 'prop-types';

// Material-UI
import { Box } from '@mui/material';

// Utility
import { rotateCoords } from '../../../util';

export const Port = forwardRef(
  ({ position, bounds, properties, rotation, ...rest }, ref) => {
    const realPos = useMemo(
      () => rotateCoords(position, rotation),
      [position, rotation],
    );

    return (
      <Box
        sx={{
          position: 'absolute',
          borderRadius: '50%',

          // Given properties
          width: properties.radius * 2,
          height: properties.radius * 2,
          backgroundColor: properties.color,

          // Positioning
          left: realPos.x * bounds.width - properties.radius,
          top: realPos.y * bounds.height - properties.radius,

          '&:hover': {
            transform: 'scale(1.25)',
          },
        }}
        {...rest}
      >
        <Box ref={ref} sx={{ width: 1, height: 1 }} />
      </Box>
    );
  },
);

Port.displayName = 'Port';

Port.propTypes = {
  /**
   * The relative position of the Port. Range between `0` and `1`
   */
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  /**
   * The bounding box of the Port's position
   */
  bounds: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  /**
   * Optional properties of the Port
   */
  properties: PropTypes.shape({
    radius: PropTypes.number,
    color: PropTypes.string,
  }),
  /**
   * The rotation of the port, around its parent's bounds
   */
  rotation: PropTypes.number,
};

Port.defaultProps = {
  properties: {
    radius: 6,
    color: '#bbb',
  },
  position: { x: 0.5, y: 0.5 },
  bounds: { x: 1, y: 1 },
  rotation: 0,
};
