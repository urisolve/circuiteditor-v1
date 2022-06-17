import { constants } from '../constants';

const gridSize = constants.DEFAULT_GRID_SIZE;

export const snapValueToGrid = (originalValue = 0) =>
  Math.round(originalValue / gridSize) * gridSize;

export const snapPosToGrid = ({ x, y } = { x: 0, y: 0 }) => ({
  x: snapValueToGrid(x),
  y: snapValueToGrid(y),
});
