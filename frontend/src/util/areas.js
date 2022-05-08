/**
 * Check wether or not if two areas overlap.
 * You can check if a point is inside an area by setting the point's width and
 * height to 0 (or any falsy value).
 *
 * @param {Object} a Area a.
 * @param {Object} b Area b.
 * @returns {Boolean} If the two areas overlap
 */
export function areasIntersect(a, b) {
  return (
    a.left < b.left + b.width &&
    a.left + a.width > b.left &&
    a.top < b.top + b.height &&
    a.top + a.height > b.top
  );
}
