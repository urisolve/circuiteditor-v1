export class Port {
  constructor({
    type = 'hybrid',
    position = { x: 0, y: 0 },
    connection = null,
  }) {
    this.type = type;
    this.position = position;
    this.connection = connection;
  }
}
