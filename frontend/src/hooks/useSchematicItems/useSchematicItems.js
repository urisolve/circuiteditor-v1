import { useMemo } from 'react';
import lodash from 'lodash';

export function useSchematicItems(schematic) {
  // Squish all items into a single array
  const items = useMemo(
    () =>
      Object.freeze(
        lodash.concat(
          schematic.components,
          schematic.nodes,
          schematic.connections,
        ),
      ),
    [schematic],
  );

  // Create an "[id]: item" map for easy access to all items
  const itemsMap = useMemo(
    () =>
      Object.freeze(
        items.reduce((itemsMap, item) => {
          itemsMap[item.id] = item;
          itemsMap[item.label.id] = item.label;
          item.ports?.forEach((port) => (itemsMap[port.id] = port));

          return itemsMap;
        }, {}),
      ),
    [items],
  );

  const labels = useMemo(
    () => Object.freeze(items.map((item) => item.label)),
    [items],
  );

  return { items, itemsMap, labels };
}
