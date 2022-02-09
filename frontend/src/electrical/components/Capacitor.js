import { Component, Label } from '../base';

export class Capacitor extends Component {
  constructor() {
    super();

    this.type = 'C';
    this.fullName = 'Capacitor';
    this.label = new Label({
      name: 'C',
      value: '10m',
      unit: 'H',
      position: { x: 10, y: 0 },
    });
  }
}
