import { useState } from 'react';

import {
  useConnections,
  useHistory,
  useNetlist,
  useSchematicParser,
  useSchematicTools,
} from '../';
import { useSchematicItems } from '../useSchematicItems';

const emptySchematic = { components: [], nodes: [], connections: [] };

export function useSchematic(
  initialSchematic = {},
  gridSize = 10,
  maxHistoryLength = 20,
) {
  const [schematic, setSchematic] = useState({
    ...emptySchematic,
    ...initialSchematic,
  });

  // Parse the schematic before anything else
  useSchematicParser(schematic, setSchematic);

  // Add extra functionality to the schematic
  const { items, itemsMap } = useSchematicItems(schematic);
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
