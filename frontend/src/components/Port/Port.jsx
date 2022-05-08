import { useMemo } from 'react';

import { ConnectionPoint } from '..';
import { constants } from '../../constants';
import { rotateCoords } from '../../util';

export function Port({
  id,
  position,
  bounds,
  properties,
  compRotation,
  ...rest
}) {
  const realPos = useMemo(
    () => rotateCoords(position, compRotation ?? 0),
    [position, compRotation],
  );

  return (
    <ConnectionPoint
      id={id}
      sx={{
        // Given properties
        width: (properties?.radius ?? constants.DEFAULT_PORT_RADIUS) * 2,
        height: (properties?.radius ?? constants.DEFAULT_PORT_RADIUS) * 2,
        backgroundColor: properties?.color ?? '#bbb',

        // Positioning
        left: realPos.x * (bounds?.width ?? 100) - (properties?.radius ?? 6),
        top: realPos.y * (bounds?.height ?? 100) - (properties?.radius ?? 6),
      }}
      {...rest}
    />
  );
}
