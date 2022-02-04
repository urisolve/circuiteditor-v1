import { useMemo, useState } from 'react';
import lodash from 'lodash';

import {
  useConnections,
  useHistory,
  useNetlist,
  useSchematicParser,
  useSchematicTools,
} from '../';

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
  const items = useMemo(
    () =>
      lodash.concat(
        schematic.components,
        schematic.nodes,
        schematic.connections,
      ),
    [schematic],
  );

  useSchematicParser(schematic, setSchematic);
  useConnections(schematic, setSchematic, items);

  const netlist = useNetlist(schematic);
  const history = useHistory(setSchematic, maxHistoryLength);
  const tools = useSchematicTools(setSchematic, history, gridSize);

  const [selectedItems, setSelectedItems] = useState(new Set());

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
