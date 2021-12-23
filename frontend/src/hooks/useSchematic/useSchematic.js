import { useEffect, useState } from 'react';

import { useConnections, useHistory, useNetlist } from '../';
import { useSchematicTools } from '../useSchematicTools';

const emptySchematic = { components: [], nodes: [], connections: [] };

export function useSchematic(
  initialSchematic = {},
  gridSize = 10,
  maxHistoryLength = 20,
) {
  initialSchematic = { ...emptySchematic, ...initialSchematic };

  const [schematic, setSchematic] = useState(initialSchematic);
  const [selectedItems, setSelectedItems] = useState(new Set());

  const items = useConnections(schematic, setSchematic);
  const netlist = useNetlist(schematic);
  const history = useHistory(setSchematic, maxHistoryLength);
  const tools = useSchematicTools(setSchematic, history, gridSize);

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
