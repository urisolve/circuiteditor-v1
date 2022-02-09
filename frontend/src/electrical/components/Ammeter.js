import { Component, Label } from '../base';

export class Ammeter extends Component {
  constructor() {
    super();

    this.type = 'IProbe';
    this.fullName = 'Ammeter';
    this.label = new Label({
      name: 'I',
      unit: 'A',
      position: { x: 10, y: 0 },
    });
  }
}
