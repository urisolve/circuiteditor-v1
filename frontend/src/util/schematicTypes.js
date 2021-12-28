export function isConnected(el, connection) {
  return el.id === connection.start || el.id === connection.end;
}

export function isComponent(element) {
  return !isConnection(element) && !isNode(element);
}

export function isConnection(element) {
  return (
    Object.prototype.hasOwnProperty.call(element, 'start') ||
    Object.prototype.hasOwnProperty.call(element, 'end')
  );
}

export function isNode(element) {
  return Object.prototype.hasOwnProperty.call(element, 'connections');
}

export function isPort(element) {
  return Object.prototype.hasOwnProperty.call(element, 'connection');
}

export function hasLabel(element) {
  return Object.prototype.hasOwnProperty.call(element, 'label');
}
