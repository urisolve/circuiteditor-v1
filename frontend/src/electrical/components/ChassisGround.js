import { Component, Label, Port } from '../base';

export class ChassisGround extends Component {
  constructor() {
    super();

    this.type = 'gnd';
    this.fullName = 'ChassisGround';
    this.ports = [new Port({ position: { x: 0.5, y: 0 } })];
    this.label = new Label({
      name: 'GND',
      value: '0',
      unit: 'V',
      disabled: true,
    });
  }
}
