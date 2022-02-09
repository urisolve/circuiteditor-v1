import { Component, Label } from '../base';

export class ACVoltageSource extends Component {
  constructor() {
    super();

    this.type = 'Vac';
    this.fullName = 'ACVoltageSource';
    this.label = new Label({
      name: 'u',
      value: '230',
      unit: 'V',
      position: { x: 70, y: 70 },
    });
  }
}
