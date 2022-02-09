import { Component, Label, Port } from '../base';

export class DCCurrentSource extends Component {
  constructor() {
    super();

    this.type = 'Idc';
    this.fullName = 'DCCurrentSource';
    this.ports = [
      new Port({ position: { x: 0.5, y: 1 } }),
      new Port({ position: { x: 0.5, y: 0 } }),
    ];
    this.label = new Label({
      name: 'I',
      value: '200m',
      unit: 'A',
      position: { x: 70, y: 70 },
    });
  }
}
