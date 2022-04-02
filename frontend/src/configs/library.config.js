import { components } from '.';

export const library = [
  {
    title: 'Connectors',
    elements: [components.Ground, components.Wire, components.Marker],
  },
  {
    title: 'Passive',
    elements: [
      components.Capacitor,
      components.Inductor,
      components.Reactance,
      components.Resistor,
    ],
  },
  {
    title: 'Probes',
    elements: [components.Ammeter, components.Voltmeter],
  },
  {
    title: 'Sources',
    elements: [
      components.ACCurrentSource,
      components.ACVoltageSource,
      components.DCCurrentSource,
      components.DCVoltageSource,
    ],
  },
];
