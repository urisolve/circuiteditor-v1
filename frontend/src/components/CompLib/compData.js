import React, { useRef } from 'react';
import { ElectricalCore, Node, Connection } from 'react-circuit-schematics';

export const compData = [
  {
    title: 'Connectors',
    items: [
      {
        name: 'Chassis Ground',
        Element: <ElectricalCore type='Chassis Ground' />,
      },
      {
        name: 'Earth Ground',
        Element: <ElectricalCore type='Earth Ground' />,
      },
      {
        name: 'Node',
        Element: <Node />,
      },
      {
        name: 'Connection',
        Element: () => {
          const nodeRef1 = useRef();
          const nodeRef2 = useRef();

          return (
            <>
              <Node ref={nodeRef1} />
              <Node ref={nodeRef2} />
              <Connection type='Earth Ground' />
            </>
          );
        },
      },
    ],
  },
  {
    title: 'Sources',
    items: [
      {
        name: 'DC Voltage Source',
        Element: <ElectricalCore type='DC Voltage Source' />,
      },
      {
        name: 'AC Voltage Source',
        Element: <ElectricalCore type='AC Voltage Source' />,
      },
      {
        name: 'DC Current Source',
        Element: <ElectricalCore type='DC Current Source' />,
      },
      {
        name: 'AC Current Source',
        Element: <ElectricalCore type='AC Current Source' />,
      },
    ],
  },
  {
    title: 'Passive',
    items: [
      {
        name: 'Resistor',
        Element: <ElectricalCore type='Resistor' />,
      },
      {
        name: 'Capacitor',
        Element: <ElectricalCore type='Capacitor' />,
      },
      {
        name: 'Polarized Capacitor',
        Element: <ElectricalCore type='Polarized Capacitor' />,
      },
      {
        name: 'Inductor',
        Element: <ElectricalCore type='Inductor' />,
      },
      {
        name: 'Reactance',
        Element: <ElectricalCore type='Reactance' />,
      },
    ],
  },
  {
    title: 'Probes',
    items: [
      {
        name: 'Voltmeter',
        Element: <ElectricalCore type='Voltmeter' />,
      },
      {
        name: 'Ammeter',
        Element: <ElectricalCore type='Ammeter' />,
      },
    ],
  },
];
