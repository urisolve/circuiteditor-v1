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
import { constants } from '../../constants';

const emptySchematic = { components: [], nodes: [], connections: [] };

export function useSchematic(
  initialSchematic = {},
  gridSize = constants.DEFAULT_GRID_SIZE,
  maxHistoryLength = 20,
) {
  const sch = { ...emptySchematic, ...initialSchematic };
  const [schematic, setSchematic] = useState(sch);

  const history = useHistory(setSchematic, maxHistoryLength);
  const tools = useSchematicTools(setSchematic, history, gridSize);

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
