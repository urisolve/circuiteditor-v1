import { Electrical } from '.';

export class Connection extends Electrical {
  constructor({ label, properties, start, end }) {
    super(label, properties);

    if (!start) throw new Error('Must specify the "start" of the connection.');
    if (!end) throw new Error('Must specify the "end" of the connection.');

    this.start = start;
    this.end = end;
    this.label.disabled = true;
  }
}
