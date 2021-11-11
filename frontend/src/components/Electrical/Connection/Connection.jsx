import { forwardRef } from 'react';
import XArrow from 'react-xarrows';

export const Connection = forwardRef(
  (
    { start, end, type, properties, gridBreak, onClick, isSelected, ...rest },
    ref,
  ) => (
    <XArrow
      start={start}
      end={end}
      path={type ?? 'grid'}
      showHead={false}
      gridBreak={gridBreak ?? '100%'}
      startAnchor='middle'
      endAnchor='middle'
      divContainerStyle={{
        zIndex: -1,
        opacity: properties?.opacity ?? 1,
      }}
      passProps={{ onClick }}
      {...rest}
    />
  ),
);
