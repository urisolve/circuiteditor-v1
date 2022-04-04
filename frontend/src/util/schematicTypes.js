export function isSchematic(element) {
  return (
    Object.prototype.hasOwnProperty.call(element, 'components') &&
    Object.prototype.hasOwnProperty.call(element, 'nodes') &&
    Object.prototype.hasOwnProperty.call(element, 'connections')
  );
}

export function isConnected(element, connection) {
  return element.id === connection?.start || element.id === connection?.end;
}

export function isComponent(element) {
  return Object.prototype.hasOwnProperty.call(element, 'ports');
}

export function isConnection(element) {
  return (
    Object.prototype.hasOwnProperty.call(element, 'start') &&
    Object.prototype.hasOwnProperty.call(element, 'end')
  );
}

export function isNode(element) {
  return !isComponent(element) && !isConnected(element);
}

export function isPort(element) {
  return Object.prototype.hasOwnProperty.call(element, 'owner');
}

export function isGround(element) {
  return element.type === 'gnd';
}

export function hasLabel(element) {
  return Object.prototype.hasOwnProperty.call(element, 'label');
}
