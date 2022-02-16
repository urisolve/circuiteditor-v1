import { useState } from 'react';

import {
  useConnections,
  useHistory,
  useNetlist,
  useSchematicParser,
  useSchematicTools,
} from '../';
import { useSchematicItems } from '../useSchematicItems';

export function useSchematic(
  initialSchematic = {},
  gridSize = 10,
  maxHistoryLength = 20,
) {
  const [schematic, setSchematic] = useState({
    components: [],
    nodes: [],
    connections: [],
    ...initialSchematic,
  });

  // Array of all the schematic's items.
  const { items, itemsMap } = useSchematicItems(schematic);
  useSchematicParser(schematic, setSchematic);
  useConnections(schematic, setSchematic, items);

  const netlist = useNetlist(schematic);
  const history = useHistory(setSchematic, maxHistoryLength);
  const tools = useSchematicTools(setSchematic, history, gridSize);

  const [selectedItems, setSelectedItems] = useState(new Set());

  return {
    data: schematic,
    items,
    itemsMap,

    ...tools,
    history,
    netlist,

    selection: {
      selectedItems,
      setSelectedItems,
    },
  };
}
