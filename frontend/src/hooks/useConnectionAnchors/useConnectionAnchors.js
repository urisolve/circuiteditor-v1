import { useMemo } from 'react';

import { calcRealPortDirection, isPort } from '../../util';

function calcPointAnchor(itemsMap, pointId) {
  const point = itemsMap.get(pointId);
  if (!isPort(point)) return 'middle';

  const comp = itemsMap.get(point.owner);
  return calcRealPortDirection(point, comp);
}

export function useConnectionAnchors(schematic, { start, end }) {
  const anchors = useMemo(
    () => ({
      startAnchor: calcPointAnchor(schematic.itemsMap, start),
      endAnchor: calcPointAnchor(schematic.itemsMap, end),
    }),
    [schematic, start, end],
  );

  return anchors;
}
