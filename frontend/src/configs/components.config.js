import { v4 as uuidv4 } from 'uuid';

const WIRE_CENTER_OFFSET = 50;
const WIRE_DEFAULT_CENTER = { x: WIRE_CENTER_OFFSET, y: WIRE_CENTER_OFFSET };

export const components = Object.freeze({
  Iac: {
    type: 'Iac',
    fullName: 'AC Current Source',
    label: {
      name: 'i',
      value: '2',
      unit: 'A',
      position: { x: 70, y: 70 },
    },
    ports: [{ position: { x: 0.5, y: 0 } }, { position: { x: 0.5, y: 1 } }],
  },
  Vac: {
    type: 'Vac',
    fullName: 'AC Voltage Source',
    label: {
      name: 'u',
      value: '230',
      unit: 'V',
      position: { x: 70, y: 70 },
    },
    ports: [{ position: { x: 0.5, y: 0 } }, { position: { x: 0.5, y: 1 } }],
  },
  IProbe: {
    type: 'IProbe',
    fullName: 'Ammeter',
    label: {
      name: 'I',
      position: { x: 10, y: 0 },
    },
    ports: [{ position: { x: 0, y: 0.5 } }, { position: { x: 1, y: 0.5 } }],
  },
  C: {
    type: 'C',
    fullName: 'Capacitor',
    label: {
      name: 'C',
      value: '10m',
      unit: 'H',
      position: { x: 10, y: 0 },
    },
    ports: [{ position: { x: 0, y: 0.5 } }, { position: { x: 1, y: 0.5 } }],
  },
  Idc: {
    type: 'Idc',
    fullName: 'DC Current Source',
    label: {
      name: 'I',
      value: '200m',
      unit: 'A',
      position: { x: 70, y: 70 },
    },
    ports: [{ position: { x: 0.5, y: 0 } }, { position: { x: 0.5, y: 1 } }],
  },
  Vdc: {
    type: 'Vdc',
    fullName: 'DC Voltage Source',
    label: {
      name: 'U',
      value: '10',
      unit: 'V',
      position: { x: 70, y: 70 },
    },
    ports: [{ position: { x: 0.5, y: 0 } }, { position: { x: 0.5, y: 1 } }],
  },
  gnd: {
    type: 'gnd',
    fullName: 'Ground',
    ports: [{ position: { x: 0.5, y: 0 } }],
  },
  L: {
    type: 'L',
    fullName: 'Inductor',
    label: {
      name: 'L',
      value: '1u',
      unit: 'F',
      position: { x: 10, y: 0 },
    },
    ports: [{ position: { x: 0, y: 0.5 } }, { position: { x: 1, y: 0.5 } }],
  },
  Z: {
    type: 'Z',
    fullName: 'Reactance',
    label: {
      name: 'Z',
      value: '10',
      unit: 'Ω',
      position: { x: 10, y: 0 },
    },
    ports: [{ position: { x: 0, y: 0.5 } }, { position: { x: 1, y: 0.5 } }],
  },
  R: {
    type: 'R',
    fullName: 'Resistor',
    label: {
      name: 'R',
      value: '10k',
      unit: 'Ω',
      position: { x: 10, y: 0 },
    },
    ports: [{ position: { x: 0, y: 0.5 } }, { position: { x: 1, y: 0.5 } }],
  },
  VProbe: {
    type: 'VProbe',
    fullName: 'Voltmeter',
    label: {
      name: 'V',
      position: { x: 10, y: 0 },
    },
    ports: [{ position: { x: 0, y: 0.5 } }, { position: { x: 1, y: 0.5 } }],
  },
  Wire: ({ x, y } = WIRE_DEFAULT_CENTER) => {
    const [id1, id2] = [uuidv4(), uuidv4()];

    return {
      type: 'Wire',
      components: [],
      connections: [{ start: id1, end: id2, gridBreak: '50%' }],
      nodes: [
        {
          id: id1,
          position: {
            x: x - WIRE_CENTER_OFFSET,
            y: y - WIRE_CENTER_OFFSET,
          },
        },
        {
          id: id2,
          position: {
            x: x + WIRE_CENTER_OFFSET,
            y: y + WIRE_CENTER_OFFSET,
          },
        },
      ],
    };
  },
  Marker: (position) => ({
    type: 'Marker',
    components: [],
    connections: [],
    nodes: [{ id: uuidv4(), position }],
  }),
});
