import { useMemo } from 'react';

import { ConnectionPoint } from '..';
import { constants } from '../../constants';
import { rotateCoords } from '../../util';

export function Port({
  id,
  connection,
  position,
  bounds,
  properties,
  rotation,
  ...rest
}) {
  const realPos = useMemo(
    () => rotateCoords(position, rotation),
    [position, rotation],
  );

  const color = useMemo(() => {
    let color = properties?.color ?? constants.DEFAULT_PORT_COLOR;

    if (!connection) {
      color = constants.ERROR_COLOR;
    }

    return color;
  }, [connection, properties?.color]);

  const radius = properties?.radius ?? constants.DEFAULT_PORT_RADIUS;

  return (
    <ConnectionPoint
      id={id}
      sx={{
        backgroundColor: color,
        borderRadius: '50%',

        height: radius * 2,
        width: radius * 2,
        left: realPos.x * bounds?.width - radius,
        top: realPos.y * bounds?.height - radius,
      }}
      {...rest}
    />
  );
}
