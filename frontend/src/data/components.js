// Electrical components SVGs
import { ReactComponent as ResistorIcon } from "../assets/electrical/resistor-us.svg";
import { ReactComponent as CapacitorIcon } from "../assets/electrical/capacitor.svg";
import { ReactComponent as DiodeIcon } from "../assets/electrical/diode.svg";
import { ReactComponent as PNPIcon } from "../assets/electrical/pnp.svg";

const ComponentsData = [
  {
    title: "Connectors",
    items: [
      {
        name: "Ground",
        icon: <ResistorIcon />,
      },

      {
        name: "Electrical Tag",
        icon: <ResistorIcon />,
      },
    ],
  },
  {
    title: "Sources",
    items: [
      {
        name: "Voltage DC",
        icon: <ResistorIcon />,
      },
      {
        name: "Voltage AC",
        icon: <ResistorIcon />,
      },
      {
        name: "Current DC",
        icon: <ResistorIcon />,
      },
      {
        name: "Current AC",
        icon: <ResistorIcon />,
      },
    ],
  },
  {
    title: "Passive",
    items: [
      {
        name: "Resistor",
        icon: <ResistorIcon />,
      },
      {
        name: "Capacitor",
        icon: <CapacitorIcon />,
      },
    ],
  },
  {
    title: "Diodes",
    items: [
      {
        name: "Diode",
        icon: <DiodeIcon />,
      },
      {
        name: "Zenner Diode",
        icon: <DiodeIcon />,
      },
      {
        name: "Schottky Diode",
        icon: <DiodeIcon />,
      },
    ],
  },
  {
    title: "Transistors",
    items: [
      {
        name: "BJT",
        icon: <PNPIcon />,
      },
      {
        name: "FET",
        icon: <PNPIcon />,
      },
      {
        name: "MOSFET",
        icon: <PNPIcon />,
      },
    ],
  },
];

export default ComponentsData;
