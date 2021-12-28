export const components = Object.freeze({
  EarthGround: () => ({
    type: 'gnd',
    fullName: 'EarthGround',
  }),
  ChassisGround: {
    type: 'gnd',
    fullName: 'ChassisGround',
  },
  DCVoltageSource: {
    type: 'Vdc',
    fullName: 'DCVoltageSource',
    label: {
      name: 'U',
    },
  },
  ACVoltageSource: {
    type: 'Vac',
    fullName: 'ACVoltageSource',
    label: {
      name: 'u',
    },
  },
  DCCurrentSource: {
    type: 'Idc',
    fullName: 'DCCurrentSource',
    label: {
      name: 'I',
    },
  },
  ACCurrentSource: {
    type: 'Iac',
    fullName: 'ACCurrentSource',
    label: {
      name: 'i',
    },
  },
  Resistor: {
    type: 'R',
    fullName: 'Resistor',
    label: {
      name: 'R',
    },
  },
  Capacitor: {
    type: 'C',
    fullName: 'Capacitor',
    label: {
      name: 'C',
    },
  },
  Inductor: {
    type: 'L',
    fullName: 'Inductor',
    label: {
      name: 'L',
    },
  },
  Reactance: {
    type: 'Z',
    fullName: 'Reactance',
    label: {
      name: 'Z',
    },
  },
  Voltmeter: {
    type: 'VProbe',
    fullName: 'Voltmeter',
    label: {
      name: 'V',
    },
  },
  Ammeter: {
    type: 'IProbe',
    fullName: 'Ammeter',
    label: {
      name: 'I',
    },
  },
});
