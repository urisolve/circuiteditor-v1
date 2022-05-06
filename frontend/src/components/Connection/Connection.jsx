import { useContext } from 'react';
import XArrow from 'react-xarrows';

import { Box } from '@mui/material';

import {
  useConnectionAnchors,
  useContextMenu,
  useGlobalRefMap,
  usePropertiesMenu,
} from '../../hooks';
import { ContextMenu, Label, PropertiesMenu } from '..';
import { SchematicContext } from '../../contexts';

export function Connection({
  id,
  start,
  end,
  label,
  properties,
  isSelected,
  schematicRef,
  updatePosition,
  ...rest
}) {
  const refMap = useGlobalRefMap(id);

  const contextMenu = useContextMenu();
  const propertiesMenu = usePropertiesMenu();

  const schematic = useContext(SchematicContext);
  const anchors = useConnectionAnchors(schematic, { start, end });

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
          onDoubleClick: () => propertiesMenu.openTab(0),
        }}
        labels={
          <Label
            owner={id}
            schematicRef={schematicRef}
            updatePosition={updatePosition}
            onDoubleClick={() => propertiesMenu.openTab(1)}
            {...label}
          />
        }
        {...rest}
      />

      <ContextMenu id={id} {...contextMenu} />

      <PropertiesMenu
        contextKey='connections'
        id={id}
        label={label}
        properties={properties}
        menu={propertiesMenu}
      />
    </Box>
  );
}
