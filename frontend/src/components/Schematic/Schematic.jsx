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
    items,
    selection: { selectedItems },
  } = useContext(SchematicContext);

  function updatePosition(id, { x, y }, startSch = null, isLabel = false) {
    if (readOnly) return;

    x = snapValueToGrid(x ?? 0, gridSize ?? 10);
    y = snapValueToGrid(y ?? 0, gridSize ?? 10);

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
        backgroundSize: `${gridSize ?? 10}px ${gridSize ?? 10}px`,
        backgroundImage: `radial-gradient(circle, #0007 1px, transparent 1px)`,

        // Border styling
        boxShadow: '0px 0px 8px #0003',
        borderRadius: `${2 * (gridSize ?? 10)}px`,
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
            gridSize={gridSize}
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
            gridSize={gridSize}
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
          parentRef={canvasRef}
          selectableItems={items}
          setSelectedItems={selection?.setSelectedItems}
          disabled={readOnly}
        />
      </Box>
    </Paper>
  );
}
