import { Component, Label } from '../base';

export class Inductor extends Component {
  constructor() {
    super();

    this.type = 'L';
    this.fullName = 'Inductor';
    this.label = new Label({
      name: 'L',
      value: '1µ',
      unit: 'F',
      position: { x: 10, y: 0 },
    });
  }
}
