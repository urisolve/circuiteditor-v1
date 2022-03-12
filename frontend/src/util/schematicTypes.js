export function isConnected(el, connection) {
  return el.id === connection.start || el.id === connection.end;
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
  return Object.prototype.hasOwnProperty.call(element, 'connections');
}

export function isPort(element) {
  return Object.prototype.hasOwnProperty.call(element, 'owner');
}

export function hasLabel(element) {
  return Object.prototype.hasOwnProperty.call(element, 'label');
}
