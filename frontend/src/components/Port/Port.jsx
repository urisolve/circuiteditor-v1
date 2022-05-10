import { useMemo } from 'react';

import { ConnectionPoint } from '..';
import { constants } from '../../constants';
import { rotateCoords } from '../../util';

export function Port({ id, position, bounds, properties, rotation, ...rest }) {
  const realPos = useMemo(
    () => rotateCoords(position, rotation),
    [position, rotation],
  );

  return (
    <ConnectionPoint
      id={id}
      sx={{
        backgroundColor: properties?.color ?? '#bbb',
        height: (properties?.radius ?? constants.DEFAULT_PORT_RADIUS) * 2,
        width: (properties?.radius ?? constants.DEFAULT_PORT_RADIUS) * 2,
        left: realPos.x * bounds?.width - (properties?.radius ?? 6),
        top: realPos.y * bounds?.height - (properties?.radius ?? 6),
      }}
      {...rest}
    />
  );
}
