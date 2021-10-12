import { useRef, useMemo, forwardRef } from 'react';
import Draggable from 'react-draggable';

import styles from './ElectricalCore.module.css';
import cx from 'classnames';

import { svgMap } from '../../../assets/electrical';
import { Port } from '../Port';

export const ElectricalCore = forwardRef(
  (
    {
      id,
      type,
      position,
      ports,
      portsRefMap,
      width,
      height,
      gridSize,
      altImageIdx,
      imgPath,
      updatePosition,
      isSelected,
      isSelecting,
      ...rest
    },
    ref,
  ) => {
    const draggableRef = useRef();

    /**
     * Calculate which SVG to use.
     *
     * If a custom image is provided, then it uses that one.
     * Otherwise, if it was provided an alternate image index, use that.
     * Otherwise, use the default one.
     */
    const src = useMemo(() => {
      // If there is a custom image, use that one
      if (imgPath) return imgPath;

      // Otherwise, grab the correct SVG
      const src = svgMap.get(type);
      return Array.isArray(src) ? src[altImageIdx ?? 0] : src;
    }, [altImageIdx, imgPath, type]);

    /**
     * Calculate the style that controls the rotation of the image
     */
    const rotationStyle = useMemo(() => {
      const rotationString = `rotate(${position?.angle ?? 0}deg)`;
      return {
        transform: rotationString,
        WebkitTransform: rotationString,
        msTransform: rotationString,
      };
    }, [position.angle]);

    const selectionStyle = useMemo(() => {
      const selectionColor = '#888';
      const blurAmount = 0;
      const displacement = { x: 3, y: 2 };

      const dropShadow = `drop-shadow(${displacement.x}px ${displacement.y}px ${blurAmount}px ${selectionColor})`;

      return {
        filter: (isSelected || isSelecting) && dropShadow,
        WebkitFilter: (isSelected || isSelecting) && dropShadow,
      };
    }, [isSelected, isSelecting]);

    return (
      <Draggable
        handle='.component-handle'
        bounds='.schematic'
        nodeRef={draggableRef}
        position={position}
        positionOffset={{ x: 5, y: 5 }}
        grid={[gridSize, gridSize]}
        onStop={(e, position) => updatePosition?.(id, position)}
        {...rest}
      >
        <div className={styles.wrapper} ref={draggableRef}>
          <img
            style={{
              width: width,
              height: height,
              ...rotationStyle,
              ...selectionStyle,
            }}
            className={cx(styles.noDrag, 'component-handle')}
            ref={ref}
            src={src}
            alt={type}
          />

          {ports.map((port) => {
            return (
              <Port
                key={port.id}
                ref={portsRefMap.get(port.id)}
                bounds={{ width, height }}
                rotation={position?.angle}
                {...rest}
                {...port}
              />
            );
          })}
        </div>
      </Draggable>
    );
  },
);
