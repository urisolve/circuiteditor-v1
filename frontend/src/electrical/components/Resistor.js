import { Component, Label } from '../base';

export class Resistor extends Component {
  constructor() {
    super();

    this.type = 'R';
    this.fullName = 'Resistor';
    this.label = new Label({
      name: 'R',
      value: '10k',
      unit: 'Ω',
      position: { x: 10, y: 0 },
    });
  }
}
