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

export function useSchematic(initialSchematic = {}, maxHistoryLength = 20) {
  const sch = { ...emptySchematic, ...initialSchematic };
  const [schematic, setSchematic] = useState(sch);

  const history = useHistory(setSchematic, maxHistoryLength);
  const tools = useSchematicTools(setSchematic, history);

  useSchematicParser(schematic, setSchematic);
  const { items, itemsMap, labels } = useSchematicItems(schematic);
  const [selectedItems, setSelectedItems] = useState(new Set());

  useConnections(schematic, setSchematic, items);
  const netlist = useNetlist(schematic);

  const area = useArea(items);

  return {
    data: schematic,
    items,
    itemsMap,
    labels,

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
