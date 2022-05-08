import { useContext } from 'react';

import { Box, Paper } from '@mui/material';

import { SelectionArea, Component, Connection, Node } from '..';
import { snapValueToGrid } from '../../util';
import { SchematicContext } from '../../contexts';
import { constants } from '../../constants';

export function Schematic({
  canvasRef,
  schematicRef,
  selection,
  width,
  height,
  readOnly,
  gridSize,
  style,
  children,
  ...rest
}) {
  const {
    data: schematic,
    editById,
    labels,
    items,
    selection: { selectedItems },
  } = useContext(SchematicContext);

  function updatePosition(id, position, startSch = null, isLabel = false) {
    if (readOnly) return;

    const grid = gridSize ?? constants.DEFAULT_GRID_SIZE;
    const x = snapValueToGrid(position.x ?? 0, grid);
    const y = snapValueToGrid(position.y ?? 0, grid);

    editById(
      id,
      (elem) => {
        if (!isLabel) elem.position = { ...elem.position, x, y };
        else elem.label.position = { ...elem.label.position, x, y };

        return elem;
      },
      startSch,
    );
  }

  return (
    <Paper
      className='schematic'
      elevation={3}
      onContextMenu={(e) => e.preventDefault()}
      ref={canvasRef}
      sx={{
        width: constants.CANVAS_RELATIVE_SIZE,
        height: constants.CANVAS_RELATIVE_SIZE,
        position: 'relative',
        zIndex: 0,

        // Grid pattern
        backgroundSize: `
          ${gridSize ?? constants.DEFAULT_GRID_SIZE}px
          ${gridSize ?? constants.DEFAULT_GRID_SIZE}px
        `,
        backgroundImage: `radial-gradient(circle, #0007 1px, transparent 1px)`,

        // Border styling
        boxShadow: '0px 0px 8px #0003',
        borderRadius: `${2 * (gridSize ?? constants.DEFAULT_GRID_SIZE)}px`,
      }}
      {...rest}
    >
      <Box
        ref={schematicRef}
        sx={{ width: 1, height: 1, pointerEvents: 'none' }}
      >
        {children}

        {schematic?.components?.map((comp) => (
          <Component
            {...comp}
            key={comp.id}
            schematicRef={schematicRef}
            updatePosition={updatePosition}
            isSelected={selection?.selectedItems.has(comp.id)}
            selectedItems={selectedItems}
          />
        ))}

        {schematic?.nodes?.map((node) => (
          <Node
            {...node}
            key={node.id}
            schematicRef={schematicRef}
            updatePosition={updatePosition}
            isSelected={selection?.selectedItems.has(node.id)}
            selectedItems={selectedItems}
          />
        ))}

        {schematic?.connections?.map(
          (conn) =>
            conn.start &&
            conn.end && (
              <Connection
                {...conn}
                key={conn.id}
                schematicRef={schematicRef}
                updatePosition={updatePosition}
                isSelected={selection?.selectedItems.has(conn.id)}
              />
            ),
        )}

        <SelectionArea
          disabled={readOnly}
          ignoreItems={labels}
          parentRef={canvasRef}
          selectableItems={items}
          setSelectedItems={selection?.setSelectedItems}
        />
      </Box>
    </Paper>
  );
}
