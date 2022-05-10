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
import { constants } from '../../constants';

export function Node({
  id,
  position,
  label,
  properties,
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

  function moveSelection(direction, { save = false } = {}) {
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
    onStart: () => {
      isDragging.on();

      setDragDirection(new Vector());
      setStartSchematic(schematic);
      setStartItems(items);

      const dragElement = items.find((item) => item.id === id);
      const originalPosition = Vector.fromObject(dragElement.position);
      setOriginalPosition(originalPosition);
    },

    onDrag: (_e, { x, y }) => {
      const dragPosition = new Vector(x, y);
      const dragDirection = dragPosition.subtract(originalPosition);

      moveSelection(dragDirection);
      setDragDirection(dragDirection);
    },

    onStop: () => {
      isDragging.off();
      moveSelection(dragDirection, { save: true });
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
          width: (properties?.radius ?? constants.DEFAULT_NODE_RADIUS) * 2,
          height: (properties?.radius ?? constants.DEFAULT_NODE_RADIUS) * 2,
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
