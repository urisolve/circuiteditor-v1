const directionOrder = ['top', 'right', 'bottom', 'left'];

// Correct implementation of mathematical modulo operator
// stackoverflow.com/questions/4467539/
function mod(n, m) {
  return ((n % m) + m) % m;
}

function getDefaultPortDirection({ position: { x, y } }) {
  if (y === 0) return 'top';
  if (y === 1) return 'bottom';
  if (x === 0) return 'left';
  if (x === 1) return 'right';
  throw new Error('Invalid port direction');
}

export function calcRealPortDirection(port, comp) {
  const defaultDirection = getDefaultPortDirection(port);
  const defaultIdx = directionOrder.indexOf(defaultDirection);
  const increment = Math.round((comp.position.angle ?? 0) / 90);
  const newIdx = mod(defaultIdx + increment, directionOrder.length);
  const newDirection = directionOrder.at(newIdx) ?? 'middle';
  return newDirection;
}
