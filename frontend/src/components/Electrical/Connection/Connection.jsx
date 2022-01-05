import { Box } from '@mui/material';
import XArrow from 'react-xarrows';
import { ContextMenu } from '..';

import { useContextMenu, useGlobalRefMap } from '../../../hooks';

export function Connection({
  id,
  start,
  end,
  type,
  properties,
  onClick,
  isSelected,
  ...rest
}) {
  const refMap = useGlobalRefMap(id);
  const contextMenu = useContextMenu();

  return (
    <Box>
      <XArrow
        start={refMap.get(start)}
        end={refMap.get(end)}
        path={type ?? 'grid'}
        showHead={false}
        gridBreak={properties?.gridBreak ?? '100%'}
        startAnchor='middle'
        endAnchor='middle'
        divContainerStyle={{
          zIndex: -1,
          opacity: properties?.opacity ?? 1,
        }}
        passProps={{ onClick, onContextMenu: contextMenu.open }}
        {...rest}
      />
      <ContextMenu id={id} {...contextMenu} />
    </Box>
  );
}
