import { forwardRef, useMemo } from 'react';
import XArrow from 'react-xarrows';

export const Connection = forwardRef(
  (
    {
      start,
      end,
      type,
      properties,
      gridBreak,
      onClick,
      isSelected,
      isSelecting,
      ...rest
    },
    ref,
  ) => {
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
      <XArrow
        start={start}
        end={end}
        path={type}
        showHead={false}
        gridBreak={gridBreak}
        startAnchor='middle'
        endAnchor='middle'
        divContainerStyle={{
          zIndex: -1,
          opacity: properties.opacity ?? 1,
        }}
        SVGcanvasStyle={selectionStyle}
        divContainerProps={{ ref }} // ! Temporary "fix"
        // SVGcanvasProps={{ ref }}
        // arrowBodyProps={{ ref }}
        passProps={{ onClick }}
        {...rest}
      />
    );
  },
);
