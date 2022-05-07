import { useContext, useMemo, useState } from 'react';
import Vector from 'victor';

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
  selectedItems,
  ...rest
}) {
  const { data: schematic, items } = useContext(SchematicContext);
  const [startSchematic, setStartSchematic] = useState(schematic);
  const [startItems, setStartItems] = useState(items);

  const contextMenu = useContextMenu();
  const propertiesMenu = usePropertiesMenu();

  const isDragging = useBoolean(false);
  const [originalPosition, setOriginalPosition] = useState(new Vector());
  const [dragDirection, setDragDirection] = useState(new Vector());

  const selectedIds = useMemo(
    () => [...new Set([id, ...selectedItems])],
    [id, selectedItems],
  );

  function moveSelection(direction, save = false) {
    selectedIds.forEach((selectedId) => {
      const selectedElement = startItems.find(({ id }) => id === selectedId);
      const originalPosition = Vector.fromObject(selectedElement.position);
      const newPosition = originalPosition.add(direction);

      updatePosition(
        selectedId,
        newPosition.toObject(),
        save ? startSchematic : null,
      );
    });
  }

  const handlers = {
    onDrag: (_e, { x, y }) => {
      const dragPosition = new Vector(x, y);
      const dragDirection = dragPosition.subtract(originalPosition);

      moveSelection(dragDirection);
      setDragDirection(dragDirection);
    },

    onStart: () => {
      isDragging.on();

      setStartSchematic(schematic);
      setStartItems(items);

      const dragElement = items.find((item) => item.id === id);
      const originalPosition = Vector.fromObject(dragElement.position);
      setOriginalPosition(originalPosition);
    },

    onStop: () => {
      isDragging.off();
      moveSelection(dragDirection);
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
          pointerEvents: 'auto',
        }}
      />

      {label && (
        <Label
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
