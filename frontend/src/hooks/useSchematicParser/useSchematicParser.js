import { useEffect } from 'react';
import { cloneDeep, isEqual } from 'lodash';

import { isConnected } from '../../util';

function normalizeNodes(schematic) {
  for (const node of schematic.nodes) {
    node.connections = schematic.connections
      .filter((connection) => isConnected(node, connection))
      .map((conn) => conn.id);

    node.type = node.connections.length > 2 ? 'real' : 'virtual';
  }
}

function normalizePorts(schematic) {
  for (const component of schematic.components) {
    for (const port of component.ports) {
      port.connection =
        schematic.connections.find((connection) =>
          isConnected(port, connection),
        )?.id ?? null;
    }
  }
}

export function parseSchematic(schematic) {
  const original = cloneDeep(schematic);

  normalizeNodes(schematic);
  normalizePorts(schematic);

  // Force reload if changes were made
  return isEqual(original, schematic) ? schematic : { ...schematic };
}

export function useSchematicParser(schematic, setSchematic) {
  useEffect(() => {
    setSchematic(parseSchematic(schematic));
  }, [schematic, setSchematic]);
}
