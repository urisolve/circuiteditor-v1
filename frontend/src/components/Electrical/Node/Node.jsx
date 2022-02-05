import { useContext, useState } from 'react';

import { Box } from '@mui/material';

import {
  useContextMenu,
  useGlobalRefMap,
  usePropertiesMenu,
} from '../../../hooks';
import { DraggableComponent } from '..';
import { SchematicContext } from '../../../contexts';
import { ContextMenu, PropertiesMenu } from '../../UI';

export function Node({
  id,
  position,
  label,
  properties,
  gridSize,
  updatePosition,
  isSelected,
  ...rest
}) {
  const refMap = useGlobalRefMap(id);

  const schematic = useContext(SchematicContext);
  const [startSch, setStartSch] = useState(schematic);

  const contextMenu = useContextMenu();
  const propertiesMenu = usePropertiesMenu();

  return (
    <DraggableComponent
      position={position}
      onStart={() => setStartSch(schematic)}
      onDrag={(_e, { x, y }) => updatePosition(id, { x, y })}
      onStop={(_e, { x, y }) => updatePosition(id, { x, y }, startSch.data)}
      {...rest}
    >
      <Box
        sx={{
          position: 'absolute',
          borderRadius: '50%',
          '&:hover': {
            transform: 'scale(1.25)',
          },

          // Given properties
          width: (properties?.radius ?? 5) * 2,
          height: (properties?.radius ?? 5) * 2,
          opacity: properties?.opacity ?? 1,
          backgroundColor: isSelected ? '#3475FF' : '#6495ED',
        }}
        onContextMenu={contextMenu.open}
        onDoubleClick={propertiesMenu.open}
      >
        <ContextMenu id={id} {...contextMenu} />
        <PropertiesMenu
          id={id}
          label={label}
          properties={properties}
          menu={propertiesMenu}
        />

        <Box ref={refMap.set(id)} sx={{ width: 1, height: 1 }} />
      </Box>
    </DraggableComponent>
  );
}
