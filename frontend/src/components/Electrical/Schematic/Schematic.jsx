import { useCallback, useRef, useEffect, useReducer } from 'react';
import useDynamicRefs from 'use-dynamic-refs';

// Material-UI
import { Paper } from '@mui/material';

// Electrical componentes
import {
  SelectionArea,
  ElectricalCore,
  Connection,
  Node,
  Label,
} from '../index';

// Utility
import { snapValueToGrid } from '../../../util';

export function Schematic({
  schematic,
  selection,
  width,
  height,
  readOnly,
  gridSize,
  gridColor,
  style,
  children,
  ...rest
}) {
  const [getRef, setRef] = useDynamicRefs();
  const canvasRef = useRef();

  // Work-around for react-xarrows updating the connection.
  const [, reRender] = useReducer(() => ({}), {});
  const renderCount = useRef(0);
  useEffect(() => {
    renderCount.current += 1;
    if (renderCount.current === 2) {
      reRender();
      renderCount.current = 0;
    }
  });

  /**
   * Update the coordinates of a Component.
   *
   * @param {String} id The id of the element that is dragged.
   * @param {Object} position The new coordinates of the element.
   * @param {Boolean} isLabel If you want to update the label's coordinates
   */
  const updatePosition = useCallback(
    (id, { x, y }, isLabel = false) => {
      // Snap the values to the grid
      x = snapValueToGrid(x, gridSize);
      y = snapValueToGrid(y, gridSize);

      // Apply the new position
      schematic.editById(id, (elem) => {
        const positionObject = isLabel ? elem.label.position : elem.position;
        positionObject.x = x;
        positionObject.y = y;
        return elem;
      });
    },
    [schematic, gridSize],
  );

  return (
    <Paper
      className='schematic'
      ref={canvasRef}
      elevation={3}
      sx={{
        width: '80%',
        height: '80%',
        position: 'relative',
        zIndex: 0,

        // Grid pattern
        backgroundImage: `radial-gradient(
        circle,
        ${gridColor ?? '#0009'} 1px,
        transparent 1px
        )`,
        backgroundSize: `${gridSize ?? 10}px ${gridSize ?? 10}px`,

        // Shadow
        border: '1px solid #eee',
        boxShadow: '0px 0px 8px #eee',
      }}
      {...rest}
    >
      {children}

      <SelectionArea
        getRef={getRef}
        parentRef={canvasRef}
        ignoreItems={schematic.labels}
        selectableItems={schematic.items}
        setSelectingItems={selection?.setSelectingItems}
        setSelectedItems={selection?.setSelectedItems}
        disabled={readOnly}
      />

      {schematic?.data?.components?.map((comp) => {
        const portsRefMap = new Map();
        comp.ports.forEach((port) => {
          portsRefMap.set(port.id, setRef(port.id));
        });

        return (
          <ElectricalCore
            {...comp}
            key={comp.id}
            ref={setRef(comp.id)}
            portsRefMap={portsRefMap}
            gridSize={gridSize}
            updatePosition={updatePosition}
            onDrag={reRender}
            isSelected={selection?.selectedItems.has(comp.id)}
            isSelecting={selection?.selectingItems.has(comp.id)}
            disabled={readOnly}
          />
        );
      })}

      {schematic?.data?.nodes?.map((node) => (
        <Node
          {...node}
          key={node.id}
          ref={setRef(node.id)}
          gridSize={gridSize}
          updatePosition={updatePosition}
          onDrag={reRender}
          isSelected={selection?.selectedItems.has(node.id)}
          isSelecting={selection?.selectingItems.has(node.id)}
          disabled={readOnly}
        />
      ))}

      {schematic?.data?.connections?.map(
        (conn) =>
          conn.start &&
          conn.end && (
            <Connection
              {...conn}
              key={conn.id}
              ref={setRef(conn.id)}
              start={getRef(conn.start)}
              end={getRef(conn.end)}
              isSelected={selection?.selectedItems.has(conn.id)}
              isSelecting={selection?.selectingItems.has(conn.id)}
              disabled={readOnly}
            />
          ),
      )}

      {schematic?.labels?.map((label) => (
        <Label
          {...label}
          key={label.id}
          ref={setRef(label.id)}
          updatePosition={updatePosition}
          disabled={readOnly}
        />
      ))}
    </Paper>
  );
};
