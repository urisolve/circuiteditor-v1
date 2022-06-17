import { useContext } from 'react';

import { Box, Paper } from '@mui/material';

import { SelectionArea, Component, Connection, Node } from '..';
import { SchematicContext } from '../../contexts';
import { constants } from '../../constants';

export function Schematic({
  canvasRef,
  schematicRef,
  selection,
  width,
  height,
  style,
  children,
  ...rest
}) {
  const {
    data: schematic,
    labels,
    items,
    selection: { selectedItems },
  } = useContext(SchematicContext);

  return (
    <Paper
      className='schematic'
      elevation={3}
      onContextMenu={(e) => e.preventDefault()}
      ref={canvasRef}
      sx={{
        height: constants.CANVAS_RELATIVE_SIZE,
        width: constants.CANVAS_RELATIVE_SIZE,

        position: 'relative',
        zIndex: 0,

        // Grid pattern
        backgroundImage: `radial-gradient(circle, #0007 1px, transparent 1px)`,
        backgroundSize: `
          ${constants.DEFAULT_GRID_SIZE}px
          ${constants.DEFAULT_GRID_SIZE}px
        `,
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
            isSelected={selection?.selectedItems.has(comp.id)}
            selectedItems={selectedItems}
          />
        ))}

        {schematic?.nodes?.map((node) => (
          <Node
            {...node}
            key={node.id}
            schematicRef={schematicRef}
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
                isSelected={selection?.selectedItems.has(conn.id)}
              />
            ),
        )}

        <SelectionArea
          ignoreItems={labels}
          parentRef={canvasRef}
          selectableItems={items}
          setSelectedItems={selection?.setSelectedItems}
        />
      </Box>
    </Paper>
  );
}
