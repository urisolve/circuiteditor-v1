/**
 * Snaps the given value to the nearest *snap point*
 * of a grid of the given size.
 *
 * @param {Number} value The value to be snapped.
 * @param {Number} gridSize The size of the desired grid.
 * @returns The snapped value.
 */
export function snapValueToGrid(value, gridSize) {
  const mod = value % gridSize;
  if (mod < gridSize / 2) return value - mod;
  return value + (gridSize - mod);
}

/**
 * Snaps a position to the grid.
 *
 * @param {*} position The position to be snapped.
 * @param {*} gridSize The size of the desired grid.
 * @returns The snapped position.
 */
export function snapPosToGrid({ x, y } = { x: 0, y: 0 }, gridSize) {
  return {
    x: snapValueToGrid(x, gridSize),
    y: snapValueToGrid(y, gridSize),
  };
} 
