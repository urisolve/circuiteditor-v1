import { useContext, useMemo, useState } from 'react';
import Vector from 'victor';

import { Avatar } from '@mui/material';

import {
  ContextMenu,
  DraggableComponent,
  Label,
  Port,
  PropertiesMenu,
} from '..';
import {
  useBoolean,
  useContextMenu,
  useGlobalRefMap,
  usePropertiesMenu,
} from '../../hooks';
import { SchematicContext } from '../../contexts';
import { symbols } from '../../assets/electrical';

export function Component({
  schematicRef,
  id,
  type,
  position,
  ports,
  label,
  properties,
  width,
  height,
  updatePosition,
  isSelected,
  selectedItems,
  ...rest
}) {
  const refMap = useGlobalRefMap(id);

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
      moveSelection(dragDirection, { save: true });
    },
  };

  return (
    <DraggableComponent
      handle='.component-handle'
      position={position}
      positionOffset={{ x: 5, y: 5 }}
      {...handlers}
      {...rest}
    >
      <Avatar
        ref={refMap.get(id)}
        src={symbols[type]}
        alt={type}
        variant='square'
        className='component-handle'
        onContextMenu={contextMenu.open}
        onDoubleClick={() => propertiesMenu.openTab(0)}
        sx={{
          cursor: isDragging.value ? 'grabbing' : 'grab',
          filter: isSelected && `drop-shadow(3px 2px 0px #888)`,
          height: height ?? 100,
          pointerEvents: 'auto',
          transform: `rotate(${position?.angle ?? 0}deg)`,
          width: width ?? 100,
        }}
      />

      {ports?.map((port) => {
        return (
          <Port
            key={port.id}
            bounds={{ width: width ?? 100, height: height ?? 100 }}
            compRotation={position?.angle ?? 0}
            {...port}
            {...rest}
          />
        );
      })}

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
        contextKey='components'
        id={id}
        label={label}
        properties={properties}
        menu={propertiesMenu}
      />
    </DraggableComponent>
  );
}
