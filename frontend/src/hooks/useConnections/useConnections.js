import { useEffect, useMemo } from 'react';
import lodash from 'lodash';

import { useGlobalRefMap } from '..';
import { isConnected, isPort, rotateCoords } from '../../util';

function normalizeNodes(schematic) {
  for (const node of schematic.nodes) {
    node.connections = schematic.connections.filter((connection) =>
      isConnected(node, connection),
    );

    node.type = node.connections.length > 2 ? 'real' : 'virtual';
  }
}

function normalizePorts(schematic) {
  for (const component of schematic.components) {
    for (const port of component.ports) {
      port.connection = schematic.connections.find((connection) =>
        isConnected(port, connection),
      );
    }
  }
}

function buildPortsMap(schematic, refMap) {
  // Map of (position string) -> (element id)
  const seenPositions = new Map();

  // Build hash map of all ports positions
  for (const component of schematic.components) {
    for (const port of component.ports) {
      // Calculate component's width and height
      const compRef = refMap(component.id).current;
      const { width, height } = compRef.getBoundingClientRect();

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
      const positionString = JSON.stringify(realPos);
      seenPositions.set(positionString, port.id);
    }
  }

  return seenPositions;
}

export function useConnections(schematic, setSchematic) {
  const refMap = useGlobalRefMap();

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

  // Calculate each Node and Port's connections.
  useEffect(() => {
    setSchematic((schematic) => {
      normalizeNodes(schematic);
      normalizePorts(schematic);

      return schematic;
    });
  }, [setSchematic, schematic]);

  // Handle the connections' main logic.
  useEffect(() => {
    setSchematic((schematic) => {
      const seenPositions = buildPortsMap(schematic, refMap);

      // Check if nodes overlay ports or other nodes
      for (const node of schematic.nodes) {
        const positionString = JSON.stringify(node.position);

        // If the node doesn't overlay any of the already seen ones,
        if (seenPositions.has(positionString)) {
          // Find what is being overlaid
          const elemPattern = { id: seenPositions.get(positionString) };
          const overlaidElem =
            lodash.find(items, elemPattern) ??
            lodash.find(
              lodash.find(items, { ports: [elemPattern] }).ports,
              elemPattern,
            );

          // If the element is a port that is already connected, do nothing
          if (isPort(overlaidElem) && overlaidElem.connection) return schematic;

          // Move connections from that node to the overlaid element
          for (const conn of schematic.connections) {
            if (conn.start === node.id) conn.start = overlaidElem.id;
            if (conn.end === node.id) conn.end = overlaidElem.id;
          }

          // Delete the useless node
          schematic.nodes = schematic.nodes.filter((n) => n.id !== node.id);
        }

        // Mark position as seen
        else seenPositions.set(positionString, node.id);
      }

      return schematic;
    });
  }, [setSchematic, schematic, items, refMap]);

  // Return the 'items' array
  return items;
}
