import { useContext } from 'react';
import XArrow from 'react-xarrows';

import { Box } from '@mui/material';

import {
  useConnectionAnchors,
  useContextMenu,
  useGlobalRefMap,
  useDoubleTap,
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
  const holdHandlers = useDoubleTap(contextMenu.open);

  const schematic = useContext(SchematicContext);
  const anchors = useConnectionAnchors(schematic, { start, end });

  return (
    <Box sx={{ pointerEvents: 'none' }}>
      <XArrow
        {...anchors}
        {...properties}
        dashness={
          properties?.dashed
            ? { animation: properties?.dashedAnimationSpeed }
            : false
        }
        gridBreak={`${
          properties?.dashedAnimationSpeed >= 0
            ? properties?.gridBreak
            : 100 - properties?.gridBreak
        }%`}
        start={
          properties?.dashedAnimationSpeed >= 0
            ? refMap.get(start)
            : refMap.get(end)
        }
        end={
          properties?.dashedAnimationSpeed >= 0
            ? refMap.get(end)
            : refMap.get(start)
        }
        path='grid'
        showHead={false}
        divContainerStyle={{
          opacity: properties?.opacity ?? 1,
          pointerEvents: 'none',
          zIndex: -1,
        }}
        passProps={{
          onContextMenu: contextMenu.open,
          onDoubleClick: () => propertiesMenu.openTab(0),
          ...holdHandlers,
        }}
        labels={
          <Label
            schematicRef={schematicRef}
            updatePosition={updatePosition}
            onDoubleClick={() => propertiesMenu.openTab(1)}
            {...label}
          />
        }
        {...rest}
      />

      <ContextMenu
        id={id}
        openProperties={() => propertiesMenu.openTab(0)}
        {...contextMenu}
      />

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
