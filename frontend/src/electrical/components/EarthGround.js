import { Component, Label, Port } from '../base';

export class EarthGround extends Component {
  constructor() {
    super();

    this.type = 'gnd';
    this.fullName = 'EarthGround';
    this.ports = [new Port({ position: { x: 0.5, y: 0 } })];
    this.label = new Label({
      name: 'GND',
      value: '0',
      unit: 'V',
      disabled: true,
    });
  }
}
