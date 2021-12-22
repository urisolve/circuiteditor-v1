import { useEffect, useState } from 'react';

import { useConnections, useHistory, useNetlist } from '../';
import { useSchematicTools } from '../useSchematicTools';

const emptySchematic = { components: [], nodes: [], connections: [] };
const defaultOptions = { maxHistoryLength: 10, gridSize: 10 };

export function useSchematic(initialSchematic = {}, options = {}) {
  initialSchematic = { ...emptySchematic, ...initialSchematic };
  options = { ...defaultOptions, ...options };

  const [schematic, setSchematic] = useState(initialSchematic);
  const [selectedItems, setSelectedItems] = useState(new Set());

  const items = useConnections(schematic, setSchematic);
  const netlist = useNetlist(schematic);
  const history = useHistory(setSchematic, options.maxHistoryLength);
  const tools = useSchematicTools(setSchematic, history, options.gridSize);

  // Temporary debug logging
  useEffect(() => console.log(netlist), [netlist]);

  return {
    data: schematic,
    items,

    ...tools,
    history,
    netlist,

    selection: {
      selectedItems,
      setSelectedItems,
    },
  };
}
