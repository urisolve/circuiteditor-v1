import { useMemo } from 'react';

import { isPort, mod } from '../../util';

const anchorPoints = Object.freeze({
  TOP: 'top',
  RIGHT: 'right',
  BOTTOM: 'bottom',
  LEFT: 'left',
  MIDDLE: 'middle',
});

// Clockwise order (+)
const directionOrder = [
  anchorPoints.TOP,
  anchorPoints.RIGHT,
  anchorPoints.BOTTOM,
  anchorPoints.LEFT,
];

function getDefaultPortDirection({ position: { x, y } }) {
  if (y === 0) return anchorPoints.TOP;
  if (y === 1) return anchorPoints.BOTTOM;
  if (x === 0) return anchorPoints.LEFT;
  if (x === 1) return anchorPoints.RIGHT;
  return anchorPoints.MIDDLE;
}

function calcRealPortDirection(port, comp) {
  const defaultDirection = getDefaultPortDirection(port);
  const defaultIdx = directionOrder.indexOf(defaultDirection);

  const increment = Math.round((comp.position.angle ?? 0) / 90);
  const newIdx = mod(defaultIdx + increment, directionOrder.length);

  const newDirection = directionOrder.at(newIdx) ?? anchorPoints.MIDDLE;
  return newDirection;
}

function calcPointAnchor(itemsMap, pointId) {
  const point = itemsMap.get(pointId);
  if (!isPort(point)) return anchorPoints.MIDDLE;

  const comp = itemsMap.get(point.owner);
  return calcRealPortDirection(point, comp);
}

function getConnectionAnchors({ itemsMap }, { start, end }) {
  return {
    startAnchor: calcPointAnchor(itemsMap, start),
    endAnchor: calcPointAnchor(itemsMap, end),
  };
}

export function useConnectionAnchors(schematic, connection) {
  return useMemo(
    () => getConnectionAnchors(schematic, connection),
    [schematic, connection],
  );
}
