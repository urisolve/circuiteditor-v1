import { components } from '.';

export const library = [
  {
    title: 'Connectors',
    items: [components.EarthGround, components.ChassisGround],
  },
  {
    title: 'Sources',
    items: [
      components.DCVoltageSource,
      components.ACVoltageSource,
      components.DCCurrentSource,
      components.ACCurrentSource,
    ],
  },
  {
    title: 'Passive',
    items: [
      components.Resistor,
      components.Capacitor,
      components.Inductor,
      components.Reactance,
    ],
  },
  {
    title: 'Probes',
    items: [components.Voltmeter, components.Ammeter],
  },
];
