import { v4 as uuidv4 } from 'uuid';
import { Label } from '.';

export class Electrical {
  constructor() {
    this.id = uuidv4();
    this.label = new Label();
    this.properties = {};
  }
}
