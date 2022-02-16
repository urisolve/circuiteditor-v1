import { useContext } from 'react';
import XArrow from 'react-xarrows';

import { Box } from '@mui/material';

import {
  useConnectionAnchors,
  useContextMenu,
  useGlobalRefMap,
  usePropertiesMenu,
} from '../../../hooks';
import { Label } from '..';
import { ContextMenu, PropertiesMenu } from '../../UI';
import { SchematicContext } from '../../../contexts';

export function Connection({
  id,
  start,
  end,
  label,
  properties,
  isSelected,
  canvasRef,
  updatePosition,
  ...rest
}) {
  const refMap = useGlobalRefMap(id);

  const contextMenu = useContextMenu();
  const propertiesMenu = usePropertiesMenu();

  const schematic = useContext(SchematicContext);
  const anchors = useConnectionAnchors(schematic, { start, end });
  console.log('🚀 ~ file: Connection.jsx ~ line 34 ~ anchors', anchors);

  return (
    <Box>
      <XArrow
        start={refMap.get(start)}
        end={refMap.get(end)}
        {...anchors}
        path='grid'
        gridBreak={properties?.gridBreak ?? '100%'}
        showHead={false}
        divContainerStyle={{
          zIndex: -1,
          opacity: properties?.opacity ?? 1,
        }}
        passProps={{
          onContextMenu: contextMenu.open,
          onDoubleClick: () => propertiesMenu.openTab(1),
        }}
        labels={
          <Label
            owner={id}
            canvasRef={canvasRef}
            updatePosition={updatePosition}
            onDoubleClick={() => propertiesMenu.openTab(1)}
            {...label}
          />
        }
        {...rest}
      />
      <ContextMenu id={id} {...contextMenu} />
      <PropertiesMenu
        id={id}
        label={label}
        properties={properties}
        menu={propertiesMenu}
      />
    </Box>
  );
}
