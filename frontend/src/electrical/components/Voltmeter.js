import { Component, Label } from '../base';

export class Voltmeter extends Component {
  constructor() {
    super();

    this.type = 'VProbe';
    this.fullName = 'Voltmeter';
    this.label = new Label({
      name: 'U',
      unit: 'V',
      position: { x: 10, y: 0 },
    });
  }
}
