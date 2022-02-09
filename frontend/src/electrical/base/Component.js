import { Electrical, Port } from '.';

export class Component extends Electrical {
  constructor() {
    super();

    this.position = { x: 0, y: 0, angle: 0 };
    this.ports = [
      new Port({ position: { x: 0, y: 0.5 } }),
      new Port({ position: { x: 1, y: 0.5 } }),
    ];
  }
}
