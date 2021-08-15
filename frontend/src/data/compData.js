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
      /*
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
      */
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
        data: {
          type: 'Resistor',
          ports: [
            { x: 0, y: 0.5 },
            { x: 1, y: 0.5 },
          ],
        },
      },
      {
        name: 'Capacitor',
        data: {
          type: 'Capacitor',
          ports: [
            { x: 0, y: 0.5 },
            { x: 1, y: 0.5 },
          ],
        },
      },
      {
        name: 'Polarized Capacitor',
        data: {
          type: 'Polarized Capacitor',
          ports: [
            { x: 0, y: 0.5 },
            { x: 1, y: 0.5 },
          ],
        },
      },
      {
        name: 'Inductor',
        data: {
          type: 'Inductor',
          ports: [
            { x: 0, y: 0.5 },
            { x: 1, y: 0.5 },
          ],
        },
      },
      {
        name: 'Reactance',
        data: {
          type: 'Reactance',
          ports: [
            { x: 0, y: 0.5 },
            { x: 1, y: 0.5 },
          ],
        },
      },
    ],
  },
  {
    title: 'Probes',
    items: [
      {
        name: 'Voltmeter',
        data: {
          type: 'Voltmeter',
          ports: [
            { x: 0, y: 0.5 },
            { x: 1, y: 0.5 },
          ],
        },
      },
      {
        name: 'Ammeter',
        data: {
          type: 'Ammeter',
          ports: [
            { x: 0, y: 0.5 },
            { x: 1, y: 0.5 },
          ],
        },
      },
    ],
  },
];
