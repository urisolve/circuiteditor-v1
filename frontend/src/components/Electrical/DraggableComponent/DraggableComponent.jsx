import Draggable from 'react-draggable';

export function DraggableComponent({
  bounds,
  handle,
  gridSize,
  children,
  ...rest
}) {
  return (
    <Draggable
      bounds={bounds ?? '.schematic'}
      handle={handle ?? '.drag-handle'}
      positionOffset={{ x: 5, y: 5 }}
      grid={[gridSize ?? 10, gridSize ?? 10]}
      {...rest}
    >
      {children}
    </Draggable>
  );
}
