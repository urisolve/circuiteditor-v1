import { Component, Label } from '../base';

export class ACCurrentSource extends Component {
  constructor() {
    super();

    this.type = 'Iac';
    this.fullName = 'ACCurrentSource';
    this.label = new Label({
      name: 'i',
      value: '2',
      unit: 'A',
      position: { x: 70, y: 70 },
    });
  }
}
