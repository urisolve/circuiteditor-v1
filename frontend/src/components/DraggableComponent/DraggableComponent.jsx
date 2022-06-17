import { useCallback, useContext, useMemo, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import Vector from 'victor';

import { Box } from '@mui/material';
import { constants } from '../../constants';
import { SchematicContext } from '../../contexts';
import { DraggableType } from '../../enums';

const gridSize = constants.DEFAULT_GRID_SIZE;

export function DraggableComponent({
  bounds,
  children,
  handle,
  id,
  isDragging,
  isHandle,
  onDrag,
  onStart,
  onStop,
  owner,
  selectedItems,
  sx,
  type,
  ...rest
}) {
  const draggableRef = useRef();

  const { data: schematic, itemsMap, move } = useContext(SchematicContext);
  const [startSchematic, setStartSchematic] = useState(schematic);
  const [startItemsMap, setStartItemsMap] = useState(itemsMap);

  const [originalPosition, setOriginalPosition] = useState(new Vector());
  const [dragDirection, setDragDirection] = useState(new Vector());

  const selectedIds = useMemo(
    () => [...new Set([id, ...(selectedItems ?? [])])],
    [id, selectedItems],
  );

  const calcMovedElement = useCallback(
    (element, direction) => {
      const originalElement = startItemsMap[element.id];
      const originalPosition = Vector.fromObject(originalElement?.position);
      const newPosition = originalPosition.add(direction);

      return newPosition.toObject();
    },
    [startItemsMap],
  );

  const handlers = useMemo(() => {
    switch (type) {
      case DraggableType.ITEM:
        return {
          onDrag: (_e, { x, y }) => {
            onDrag?.();

            const dragPosition = new Vector(x, y);
            const dragDirection = dragPosition.subtract(originalPosition);

            setDragDirection(dragDirection);

            move.items(
              selectedIds,
              (element) => calcMovedElement(element, dragDirection),
              { startSchematic, save: false },
            );
          },

          onStart: () => {
            onStart?.();

            setDragDirection(new Vector());
            setOriginalPosition(Vector.fromObject(itemsMap[id].position));
            setStartItemsMap(itemsMap);
            setStartSchematic(schematic);
          },

          onStop: () => {
            onStop?.();

            move.items(
              selectedIds,
              (element) => calcMovedElement(element, dragDirection),
              { startSchematic, save: true },
            );
          },
        };

      case DraggableType.LABEL:
        return {
          onDrag: (_e, { x, y }) => {
            onDrag?.();
            move.labels([owner], { x, y }, { startSchematic, save: false });
          },

          onStart: () => {
            onStart?.();
            setStartSchematic(schematic);
          },

          onStop: (_e, { x, y }) => {
            onStop?.();
            move.labels([owner], { x, y }, { startSchematic, save: true });
          },
        };

      default:
        return {};
    }
  }, [
    calcMovedElement,
    dragDirection,
    id,
    itemsMap,
    move,
    onDrag,
    onStart,
    onStop,
    originalPosition,
    owner,
    schematic,
    selectedIds,
    startSchematic,
    type,
  ]);

  return (
    <Draggable
      bounds={bounds ?? '.schematic'}
      grid={[gridSize, gridSize]}
      handle={handle}
      nodeRef={draggableRef}
      positionOffset={{ x: 5, y: 5 }}
      {...handlers}
      {...rest}
    >
      <Box
        ref={draggableRef}
        sx={{
          position: 'absolute',
          userSelect: 'none',
          top: 0,
          left: 0,
          ...sx,
        }}
      >
        {children}
      </Box>
    </Draggable>
  );
}
