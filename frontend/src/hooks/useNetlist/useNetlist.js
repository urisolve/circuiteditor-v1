import { useMemo } from 'react';

function buildNetlist(schematic) {
  const netlist = '';

  return netlist;
}

export const useNetlist = (schematic) =>
  useMemo(() => buildNetlist(schematic), [schematic]);
