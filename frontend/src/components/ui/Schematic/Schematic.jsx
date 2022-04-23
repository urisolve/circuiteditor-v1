import { useCallback, useContext } from 'react';

// Material-UI
import { Paper } from '@mui/material';

// Custom libraries
import { SelectionArea, Component, Connection, Node } from '..';
import { snapValueToGrid } from '../../../util';
import { SchematicContext } from '../../../contexts';

const canvasRelativeSize = '70%';

export function Schematic({
  canvasRef,
  selection,
  width,
  height,
  readOnly,
  gridSize,
  style,
  children,
  ...rest
}) {
  const schematic = useContext(SchematicContext);

  const updatePosition = useCallback(
    (id, { x, y }, startSch = null, isLabel = false) => {
      // Snap the values to the grid
      x = snapValueToGrid(x ?? 0, gridSize ?? 10);
      y = snapValueToGrid(y ?? 0, gridSize ?? 10);

      // Apply the new position
      schematic.editById(
        id,
        (elem) => {
          if (!isLabel) elem.position = { ...elem.position, x, y };
          else elem.label.position = { ...elem.label.position, x, y };

          return elem;
        },
        startSch,
      );
    },
    [schematic, gridSize],
  );

  return (
    <Paper
      className='schematic'
      ref={canvasRef}
      elevation={3}
      onContextMenu={(e) => e.preventDefault()}
      sx={{
        width: canvasRelativeSize,
        height: canvasRelativeSize,
        position: 'relative',
        zIndex: 0,

        // Grid pattern
        backgroundSize: `${gridSize ?? 10}px ${gridSize ?? 10}px`,
        backgroundImage: `radial-gradient(circle, #0007 1px, transparent 1px)`,

        // Border styling
        boxShadow: '0px 0px 8px #0003',
        borderRadius: `${2 * (gridSize ?? 10)}px`,
      }}
      {...rest}
    >
      {children}

      {schematic?.data?.components?.map((comp) => (
        <Component
          {...comp}
          key={comp.id}
          canvasRef={canvasRef}
          gridSize={gridSize}
          updatePosition={updatePosition}
          isSelected={selection?.selectedItems.has(comp.id)}
        />
      ))}

      {schematic?.data?.nodes?.map((node) => (
        <Node
          {...node}
          key={node.id}
          canvasRef={canvasRef}
          gridSize={gridSize}
          updatePosition={updatePosition}
          isSelected={selection?.selectedItems.has(node.id)}
        />
      ))}

      {schematic?.data?.connections?.map(
        (conn) =>
          conn.start &&
          conn.end && (
            <Connection
              {...conn}
              key={conn.id}
              canvasRef={canvasRef}
              updatePosition={updatePosition}
              isSelected={selection?.selectedItems.has(conn.id)}
            />
          ),
      )}

      <SelectionArea
        parentRef={canvasRef}
        selectableItems={schematic.items}
        setSelectedItems={selection?.setSelectedItems}
        disabled={readOnly}
      />
    </Paper>
  );
}
