import { createElement, forwardRef } from 'react';
import Draggable from 'react-draggable';
import cx from 'classnames';

import styles from './Label.module.css';
import { DefaultLabel } from './DefaultLabel';

export const Label = forwardRef(
  ({ as, owner, position, gridSize, updatePosition, ...rest }, ref) => {
    return (
      <Draggable
        bounds='.schematic'
        position={position}
        nodeRef={ref}
        grid={[gridSize, gridSize]}
        onStop={(_e, position) => updatePosition?.(owner, position, true)}
        {...rest}
      >
        <div className={cx(styles.wrapper, styles.unselectable)} ref={ref}>
          {as ? createElement(as, rest) : <DefaultLabel {...rest} />}
        </div>
      </Draggable>
    );
  },
);
