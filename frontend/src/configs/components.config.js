import { v4 as uuidv4 } from 'uuid';

const WIRE_CENTER_OFFSET = 50;
const WIRE_DEFAULT_CENTER = { x: WIRE_CENTER_OFFSET, y: WIRE_CENTER_OFFSET };

export const components = Object.freeze({
  ACCurrentSource: {
    type: 'Iac',
    fullName: 'ACCurrentSource',
    label: {
      name: 'i',
      value: '2',
      unit: 'A',
      position: { x: 70, y: 70 },
    },
    ports: [{ position: { x: 0.5, y: 0 } }, { position: { x: 0.5, y: 1 } }],
  },
  ACVoltageSource: {
    type: 'Vac',
    fullName: 'ACVoltageSource',
    label: {
      name: 'u',
      value: '230',
      unit: 'V',
      position: { x: 70, y: 70 },
    },
    ports: [{ position: { x: 0.5, y: 0 } }, { position: { x: 0.5, y: 1 } }],
  },
  Ammeter: {
    type: 'IProbe',
    fullName: 'Ammeter',
    label: {
      name: 'I',
      unit: 'A',
      position: { x: 10, y: 0 },
    },
    ports: [{ position: { x: 0, y: 0.5 } }, { position: { x: 1, y: 0.5 } }],
  },
  Capacitor: {
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
  DCCurrentSource: {
    type: 'Idc',
    fullName: 'DCCurrentSource',
    label: {
      name: 'I',
      value: '200m',
      unit: 'A',
      position: { x: 70, y: 70 },
    },
    ports: [{ position: { x: 0.5, y: 0 } }, { position: { x: 0.5, y: 1 } }],
  },
  DCVoltageSource: {
    type: 'Vdc',
    fullName: 'DCVoltageSource',
    label: {
      name: 'U',
      value: '10',
      unit: 'V',
      position: { x: 70, y: 70 },
    },
    ports: [{ position: { x: 0.5, y: 0 } }, { position: { x: 0.5, y: 1 } }],
  },
  Ground: {
    type: 'gnd',
    fullName: 'Ground',
    ports: [{ position: { x: 0.5, y: 0 } }],
  },
  Inductor: {
    type: 'L',
    fullName: 'Inductor',
    label: {
      name: 'L',
      value: '1µ',
      unit: 'F',
      position: { x: 10, y: 0 },
    },
    ports: [{ position: { x: 0, y: 0.5 } }, { position: { x: 1, y: 0.5 } }],
  },
  Reactance: {
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
  Resistor: {
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
  Voltmeter: {
    type: 'VProbe',
    fullName: 'Voltmeter',
    label: {
      name: 'V',
      unit: 'V',
      position: { x: 10, y: 0 },
    },
    ports: [{ position: { x: 0, y: 0.5 } }, { position: { x: 1, y: 0.5 } }],
  },
  Wire: ({ x, y } = WIRE_DEFAULT_CENTER) => {
    const [id1, id2] = [uuidv4(), uuidv4()];

    return {
      fullName: 'Wire',
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
    fullName: 'Marker',
    components: [],
    connections: [],
    nodes: [{ id: uuidv4(), position }],
  }),
});
