import { useState } from 'react';

import {
  useArea,
  useConnections,
  useHistory,
  useNetlist,
  useSchematicParser,
  useSchematicTools,
  useSchematicItems,
} from '../';

const emptySchematic = { components: [], nodes: [], connections: [] };

export function useSchematic(
  initialSchematic = {},
  gridSize = 10,
  maxHistoryLength = 20,
) {
  const sch = { ...emptySchematic, ...initialSchematic };
  const [schematic, setSchematic] = useState(sch);

  const history = useHistory(setSchematic, maxHistoryLength);
  const tools = useSchematicTools(setSchematic, history, gridSize);

  useSchematicParser(schematic, setSchematic);
  const { items, itemsMap } = useSchematicItems(schematic);
  const [selectedItems, setSelectedItems] = useState(new Set());

  useConnections(schematic, setSchematic, items);
  const netlist = useNetlist(schematic);

  const area = useArea(items);

  return {
    data: schematic,
    items,
    itemsMap,

    ...tools,
    history,
    netlist,
    area,

    selection: {
      selectedItems,
      setSelectedItems,
    },
  };
}
