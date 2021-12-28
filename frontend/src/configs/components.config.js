export const components = Object.freeze({
  EarthGround: {
    type: 'gnd',
    fullName: 'EarthGround',
    ports: [{ position: { x: 0.5, y: 0 } }],
  },
  ChassisGround: {
    type: 'gnd',
    fullName: 'ChassisGround',
    ports: [{ position: { x: 0.5, y: 0 } }],
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
  Resistor: {
    type: 'R',
    fullName: 'Resistor',
    label: {
      name: 'R',
      value: '10k',
      unit: 'Ω',
      position: { x: 10, y: 0 },
    },
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
  },
  Voltmeter: {
    type: 'VProbe',
    fullName: 'Voltmeter',
    label: {
      name: 'V',
      position: { x: 10, y: 0 },
    },
  },
  Ammeter: {
    type: 'IProbe',
    fullName: 'Ammeter',
    label: {
      name: 'I',
      position: { x: 10, y: 0 },
    },
  },
});
