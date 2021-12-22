import { forwardRef, useEffect } from 'react';
import XArrow from 'react-xarrows';

import { useGlobalRefMap } from '../../../hooks';

export const Connection = forwardRef(
  ({ id, start, end, type, properties, onClick, isSelected, ...rest }, ref) => {
    const refMap = useGlobalRefMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => () => refMap.remove(id), []);

    return (
      <XArrow
        start={start}
        end={end}
        path={type ?? 'grid'}
        showHead={false}
        gridBreak={properties?.gridBreak ?? '100%'}
        startAnchor='middle'
        endAnchor='middle'
        divContainerStyle={{
          zIndex: -1,
          opacity: properties?.opacity ?? 1,
        }}
        passProps={{ onClick }}
        {...rest}
      />
    );
  },
);
