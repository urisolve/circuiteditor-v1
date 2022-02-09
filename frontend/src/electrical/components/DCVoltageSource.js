import { Component, Label, Port } from '../base';

export class DCVoltageSource extends Component {
  constructor() {
    super();

    this.type = 'Vdc';
    this.fullName = 'DCVoltageSource';
    this.ports = [
      new Port({ position: { x: 0.5, y: 1 } }),
      new Port({ position: { x: 0.5, y: 0 } }),
    ];
    this.label = new Label({
      name: 'U',
      value: '10',
      unit: 'V',
      position: { x: 70, y: 70 },
    });
  }
}
