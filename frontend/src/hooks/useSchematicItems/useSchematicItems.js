import { useMemo } from 'react';
import lodash from 'lodash';

export function useSchematicItems(schematic) {
  // Squish all items into a single array
  const items = useMemo(
    () =>
      lodash.concat(
        schematic.components,
        schematic.nodes,
        schematic.connections,
      ),
    [schematic],
  );

  // Create an "[id]: item" map for easy access to all items
  const itemsMap = useMemo(
    () =>
      items.reduce((acc, item) => {
        acc.set(item.id, item);
        item?.ports?.forEach((port) => acc.set(port.id, port));

        return acc;
      }, new Map()),
    [items],
  );

  const labels = useMemo(() => items.map((item) => item.label), [items]);

  return { items, itemsMap, labels };
}
