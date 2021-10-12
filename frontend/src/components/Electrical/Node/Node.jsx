import { forwardRef, useRef, useMemo } from 'react';
import Draggable from 'react-draggable';

import cx from 'classnames';
import styles from './Node.module.css';

export const Node = forwardRef(
  (
    {
      id,
      position,
      properties,
      gridSize,
      updatePosition,
      isSelected,
      isSelecting,
      ...rest
    },
    ref,
  ) => {
    const draggableRef = useRef();

    const selectionStyle = useMemo(() => {
      const selectionColor = isSelected
        ? '#3475FF'
        : isSelecting
        ? '#3475FF'
        : properties.color;

      return {
        backgroundColor: selectionColor,
      };
    }, [isSelected, isSelecting, properties.color]);

    return (
      <Draggable
        handle='.node-handle'
        bounds='.schematic'
        position={position}
        nodeRef={draggableRef}
        grid={[gridSize, gridSize]}
        onStop={(_e, position) => updatePosition?.(id, position)}
        {...rest}
      >
        <div
          className={cx(styles.node, 'node-handle')}
          ref={draggableRef}
          style={{
            width: (properties.radius ?? 6) * 2,
            height: (properties.radius ?? 6) * 2,
            opacity: properties.opacity ?? 1,
            ...selectionStyle,
          }}
        >
          <div ref={ref} className={styles.connectionPoint} />
        </div>
      </Draggable>
    );
  },
);
