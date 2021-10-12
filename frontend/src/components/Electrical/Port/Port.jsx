import { forwardRef, useMemo } from 'react';

import styles from './Port.module.css';
import { rotateCoords } from '../../../util';

export const Port = forwardRef(
  ({ position, bounds, properties, rotation, ...rest }, ref) => {
    const realPos = useMemo(
      () => rotateCoords(position, rotation),
      [position, rotation],
    );

    return (
      <div
        className={styles.port}
        style={{
          // The properties
          width: properties.radius * 2,
          height: properties.radius * 2,
          backgroundColor: properties.color,

          // The positioning
          left: realPos.x * bounds.width - properties.radius,
          top: realPos.y * bounds.height - properties.radius,
        }}
        {...rest}
      >
        <div ref={ref} className={styles.connectionPoint} />
      </div>
    );
  },
);
