export function moveConnection(connection, from, to) {
  if (connection.start === from.id) connection.start = to.id;
  else connection.end = to.id;
}

export function isConnectionRedundant(connection) {
  return connection.start === connection.end;
}