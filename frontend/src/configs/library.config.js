import { components } from '.';

const library = [
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

const SORT_KEY = 'fullName';
const sortedLibrary = library.map((menu) => {
  menu.items.sort((a, b) => a[SORT_KEY].localeCompare(b[SORT_KEY]));
  return menu;
});

export { sortedLibrary as library };
