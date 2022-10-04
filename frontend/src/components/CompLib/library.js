import { components as comps } from '../../electrical';

export const library = [
  {
    title: 'library.groupTitle.connectors',
    elements: [comps.gnd, comps.Marker, comps.Wire],
  },
  {
    title: 'library.groupTitle.passive',
    elements: [comps.C, comps.L, comps.R, comps.Z],
  },
  {
    title: 'library.groupTitle.probes',
    elements: [comps.IProbe, comps.VProbe],
  },
  {
    title: 'library.groupTitle.sources',
    elements: [comps.Iac, comps.Idc, comps.Vac, comps.Vdc],
  },
];
