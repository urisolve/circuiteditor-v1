import { useMemo } from 'react';

const COMPONENT_SIZE = 100;
const PADDING = 100;

export function useArea(items) {
  return useMemo(() => {
    const records = {
      minX: Infinity,
      minY: Infinity,
      maxX: -Infinity,
      maxY: -Infinity,
    };

    // Find the outer points
    items.forEach((item) => {
      if (!item.position) return;

      const { position } = item;
      const { x, y } = position;

      if (x < records.minX) records.minX = x;
      if (y < records.minY) records.minY = y;
      if (x > records.maxX) records.maxX = x;
      if (y > records.maxY) records.maxY = y;
    });

    // Calculate the area
    const area = {
      x: records.minX,
      y: records.minY,
      width: records.maxX - records.minX,
      height: records.maxY - records.minY,
    };

    // Scale area to compensate for component size
    // Does not take into account if the item is a node (without size)
    area.width += COMPONENT_SIZE;
    area.height += COMPONENT_SIZE;

    // Add padding
    area.x -= PADDING;
    area.y -= PADDING;
    area.width += 2 * PADDING;
    area.height += 2 * PADDING;

    return area;
  }, [items]);
}
