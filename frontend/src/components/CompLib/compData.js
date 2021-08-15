import React from 'react';
import { ElectricalCore, Node, Connection } from 'react-circuit-schematics';

export const compData = [
  {
    title: 'Connectors',
    items: [
      {
        name: 'Chassis Ground',
        element: <ElectricalCore type='Chassis Ground' />,
      },
      {
        name: 'Earth Ground',
        element: <ElectricalCore type='Earth Ground' />,
      },
      /*
      {
        name: 'Node',
        element: <Node />,
      },
      {
        name: 'Connection',
        element: () => {
          const nodeRef1 = useRef()
          const nodeRef2 = useRef()
        
          return (
            <Node ref={nodeRef1} />
            <Node ref={nodeRef2} />
            <Connection type='Earth Ground' />
          );
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
        element: <ElectricalCore type='DC Voltage Source' />,
      },
      {
        name: 'AC Voltage Source',
        element: <ElectricalCore type='AC Voltage Source' />,
      },
      {
        name: 'DC Current Source',
        element: <ElectricalCore type='DC Current Source' />,
      },
      {
        name: 'AC Current Source',
        element: <ElectricalCore type='AC Current Source' />,
      },
    ],
  },
  {
    title: 'Passive',
    items: [
      {
        name: 'Resistor',
        element: <ElectricalCore type='Resistor' />,
      },
      {
        name: 'Capacitor',
        element: <ElectricalCore type='Capacitor' />,
      },
      {
        name: 'Polarized Capacitor',
        element: <ElectricalCore type='Polarized Capacitor' />,
      },
      {
        name: 'Inductor',
        element: <ElectricalCore type='Inductor' />,
      },
      {
        name: 'Reactance',
        element: <ElectricalCore type='Reactance' />,
      },
    ],
  },
  {
    title: 'Probes',
    items: [
      {
        name: 'Voltmeter',
        element: <ElectricalCore type='Voltmeter' />,
      },
      {
        name: 'Ammeter',
        element: <ElectricalCore type='Ammeter' />,
      },
    ],
  },
];
