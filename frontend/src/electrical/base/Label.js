export class Label {
  constructor({
    name = '',
    value = '',
    unit = '',
    position = { x: 0, y: 0 },
    disabled = false,
  }) {
    this.name = name;
    this.value = value;
    this.unit = unit;
    this.position = position;
    this.disabled = disabled;
  }
}
