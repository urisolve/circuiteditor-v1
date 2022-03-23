import { components } from '.';

export const library = [
  {
    title: 'Connectors',
    items: [components.Ground],
  },
  {
    title: 'Passive',
    items: [
      components.Capacitor,
      components.Inductor,
      components.Reactance,
      components.Resistor,
    ],
  },
  {
    title: 'Probes',
    items: [components.Ammeter, components.Voltmeter],
  },
  {
    title: 'Sources',
    items: [
      components.ACCurrentSource,
      components.ACVoltageSource,
      components.DCCurrentSource,
      components.DCVoltageSource,
    ],
  },
];
