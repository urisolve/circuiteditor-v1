import { Component, Label } from '../base';

export class Reactance extends Component {
  constructor() {
    super();

    this.type = 'Z';
    this.fullName = 'Reactance';
    this.label = new Label({
      name: 'Z',
      value: '10',
      unit: 'Ω',
      position: { x: 10, y: 0 },
    });
  }
}
