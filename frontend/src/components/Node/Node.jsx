import { useContext, useMemo, useState } from 'react';
import Vector from 'victor';

import {
  ContextMenu,
  PropertiesMenu,
  ConnectionPoint,
  DraggableComponent,
  Label,
} from '..';
import {
  useBoolean,
  useContextMenu,
  useDoubleTap,
  usePropertiesMenu,
} from '../../hooks';
import { SchematicContext } from '../../contexts';
import { shadeColor } from '../../util';

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
  const holdHandlers = useDoubleTap(contextMenu.open);

  const isDragging = useBoolean(false);
  const [originalPosition, setOriginalPosition] = useState(new Vector());
  const [dragDirection, setDragDirection] = useState(new Vector());

  const selectedIds = useMemo(
    () => [...new Set([id, ...selectedItems])],
    [id, selectedItems],
  );

  function moveSelection(direction, { save = false } = {}) {
    selectedIds.forEach((selectedId, idx) => {
      const selectedElement = startItems.find(({ id }) => id === selectedId);
      const originalPosition = Vector.fromObject(selectedElement.position);
      const newPosition = originalPosition.add(direction);

      const isLastOfSelection = idx === selectedIds.length - 1;

      updatePosition(
        selectedId,
        newPosition.toObject(),
        save && isLastOfSelection ? startSchematic : null,
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
        className='node-handle'
        id={id}
        isDragging={isDragging.value}
        {...holdHandlers}
        onContextMenu={contextMenu.open}
        onDoubleClick={() => propertiesMenu.openTab(0)}
        sx={{
          width: properties?.radius * 2,
          height: properties?.radius * 2,
          backgroundColor: isSelected
            ? shadeColor(properties?.color, -40)
            : properties?.color,
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

      <ContextMenu
        id={id}
        openProperties={() => propertiesMenu.openTab(0)}
        {...contextMenu}
      />

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
