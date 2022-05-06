import { useContext, useState } from 'react';

import {
  ContextMenu,
  PropertiesMenu,
  ConnectionPoint,
  DraggableComponent,
  Label,
} from '..';
import { useBoolean, useContextMenu, usePropertiesMenu } from '../../hooks';
import { SchematicContext } from '../../contexts';

export function Node({
  id,
  position,
  label,
  properties,
  gridSize,
  updatePosition,
  isSelected,
  schematicRef,
  ...rest
}) {
  const schematic = useContext(SchematicContext);
  const [startSch, setStartSch] = useState(schematic);

  const contextMenu = useContextMenu();
  const propertiesMenu = usePropertiesMenu();

  const isDragging = useBoolean(false);

  const handlers = {
    onDrag: (_e, { x, y }) => {
      updatePosition(id, { x, y });
    },
    onStart: () => {
      isDragging.on();
      setStartSch(schematic);
    },
    onStop: (_e, { x, y }) => {
      isDragging.off();
      updatePosition(id, { x, y }, startSch.data);
    },
  };

  return (
    <DraggableComponent
      handle='.node-handle'
      position={position}
      {...handlers}
      {...rest}
    >
      <ConnectionPoint
        id={id}
        className='node-handle'
        onContextMenu={contextMenu.open}
        onDoubleClick={() => propertiesMenu.openTab(0)}
        isDragging={isDragging.value}
        sx={{
          width: (properties?.radius ?? 5) * 2,
          height: (properties?.radius ?? 5) * 2,
          backgroundColor: isSelected ? '#3475FF' : '#6495ED',
        }}
      />

      {label && (
        <Label
          owner={id}
          schematicRef={schematicRef}
          updatePosition={updatePosition}
          onDoubleClick={() => propertiesMenu.openTab(1)}
          {...label}
        />
      )}

      <ContextMenu id={id} {...contextMenu} />
      <PropertiesMenu
        contextKey='nodes'
        id={id}
        label={label}
        properties={properties}
        menu={propertiesMenu}
      />
    </DraggableComponent>
  );
}
