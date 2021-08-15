export const compData = [
  {
    title: 'Connectors',
    items: [
      {
        name: 'Chassis Ground',
        data: {
          type: 'Chassis Ground',
          ports: [{ x: 0.5, y: 0 }],
        },
      },
      {
        name: 'Earth Ground',
        data: {
          type: 'Earth Ground',
          ports: [{ x: 0.5, y: 0 }],
        },
      },
      {
        name: 'Node',
        data: {
          type: 'virtual',
        },
      },
      {
        name: 'Connection',
        data: {
          start: null,
          end: null,
        },
      },
    ],
  },
  {
    title: 'Sources',
    items: [
      {
        name: 'DC Voltage Source',
        data: {
          type: 'DC Voltage Source',
          ports: [
            { x: 0.5, y: 0 },
            { x: 0.5, y: 1 },
          ],
        },
      },
      {
        name: 'AC Voltage Source',
        data: {
          type: 'AC Voltage Source',
          ports: [
            { x: 0.5, y: 0 },
            { x: 0.5, y: 1 },
          ],
        },
      },
      {
        name: 'DC Current Source',
        data: {
          type: 'DC Current Source',
          ports: [
            { x: 0.5, y: 0 },
            { x: 0.5, y: 1 },
          ],
        },
      },
      {
        name: 'AC Current Source',
        data: {
          type: 'AC Current Source',
          ports: [
            { x: 0.5, y: 0 },
            { x: 0.5, y: 1 },
          ],
        },
      },
    ],
  },
  {
    title: 'Passive',
    items: [
      {
        name: 'Resistor',
        data: {},
      },
      {
        name: 'Capacitor',
        data: {},
      },
      {
        name: 'Polarized Capacitor',
        data: {},
      },
      {
        name: 'Inductor',
        data: {},
      },
      {
        name: 'Reactance',
        data: {},
      },
    ],
  },
  {
    title: 'Probes',
    items: [
      {
        name: 'Voltmeter',
        data: {},
      },
      {
        name: 'Ammeter',
        data: {},
      },
    ],
  },
];
