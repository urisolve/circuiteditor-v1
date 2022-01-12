import { Box } from '@mui/material';
import XArrow from 'react-xarrows';

import {
  useContextMenu,
  useGlobalRefMap,
  usePropertiesMenu,
} from '../../../hooks';
import { ContextMenu, PropertiesMenu } from '../../UI';

export function Connection({
  id,
  start,
  end,
  type,
  label,
  properties,
  isSelected,
  ...rest
}) {
  const refMap = useGlobalRefMap(id);

  const contextMenu = useContextMenu();
  const propertiesMenu = usePropertiesMenu();

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
        passProps={{
          onContextMenu: contextMenu.open,
          onDoubleClick: propertiesMenu.open,
        }}
        {...rest}
      />
      <ContextMenu id={id} {...contextMenu} />
      <PropertiesMenu
        id={id}
        label={label}
        properties={properties}
        {...propertiesMenu}
      />
    </Box>
  );
}
