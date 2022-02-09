import { Electrical } from '.';

export class Node extends Electrical {
  constructor({ type, connections, position }) {
    super();

    this.type = type ?? null;
    this.connections = connections ?? [];
    this.position = position ?? { x: 0, y: 0 };
    this.label.disabled = true;
  }
}
