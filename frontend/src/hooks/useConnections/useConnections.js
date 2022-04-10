import { useLayoutEffect } from 'react';
import lodash, { cloneDeep, isEqual } from 'lodash';

import { useGlobalRefMap } from '..';
import { isPort, rotateCoords } from '../../util';

function buildPortsMap(schematic, refMap) {
  // Map of (position string) -> (element id)
  const seenPositions = new Map();

  // Build hash map of all ports positions
  for (const component of schematic.components) {
    for (const port of component.ports) {
      // Calculate component's width and height
      const compRef = refMap.get(component.id).current;
      const { width, height } = compRef?.getBoundingClientRect() ?? {};

      // Calculate port's real position
      const rotatedCoords = rotateCoords(
        port.position,
        component.position.angle,
      );
      const realPos = {
        x: component.position.x + rotatedCoords.x * width,
        y: component.position.y + rotatedCoords.y * height,
      };

      // Add it to the hash map
      const positionHash = JSON.stringify(realPos);
      seenPositions.set(positionHash, port.id);
    }
  }

  return seenPositions;
}

export function useConnections(schematic, setSchematic, items) {
  const refMap = useGlobalRefMap();

  // Handle the connections' main logic.
  useLayoutEffect(() => {
    setSchematic((schematic) => {
      const initialSchematic = cloneDeep(schematic);
      const seenPositions = buildPortsMap(schematic, refMap);

      // Check if nodes overlay ports or other nodes
      for (const node of schematic.nodes) {
        const positionHash = JSON.stringify(node.position);

        // If the node doesn't overlay any of the already seen ones,
        if (seenPositions.has(positionHash)) {
          // Find what is being overlaid
          const elemPattern = { id: seenPositions.get(positionHash) };
          const overlaidElem =
            lodash.find(items, elemPattern) ??
            lodash.find(
              lodash.find(items, { ports: [elemPattern] }).ports,
              elemPattern,
            );

          // Don't connect if:
          // - The element is a port that is already connected
          // - The element is a port and the node has multiple connections
          if (
            isPort(overlaidElem) &&
            (overlaidElem.connection || node.connections.length > 1)
          )
            return schematic;

          // Move connections from that node to the overlaid element
          for (const conn of schematic.connections) {
            if (conn.start === node.id) conn.start = overlaidElem.id;
            if (conn.end === node.id) conn.end = overlaidElem.id;
          }

          // Delete the useless node
          schematic.nodes = schematic.nodes.filter((n) => n.id !== node.id);
        }

        // Mark position as seen
        else seenPositions.set(positionHash, node.id);
      }

      return isEqual(initialSchematic, schematic)
        ? schematic
        : { ...schematic }; // Force a re-render
    });
  }, [setSchematic, schematic, items, refMap]);
}
