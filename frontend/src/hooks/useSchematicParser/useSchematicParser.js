import { useEffect } from 'react';
import lodash, { cloneDeep, isEqual } from 'lodash';

import { isConnected } from '../../util';
import { components } from '../../configs';

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
      port.owner = component.id;
      port.connection =
        schematic.connections.find((connection) =>
          isConnected(port, connection),
        )?.id ?? null;
    }
  }
}

export function parseSchematic(schematic) {
  const initialSchematic = cloneDeep(schematic);

  // Apply default properties to incomplete components
  schematic.components = schematic.components.map((comp) =>
    lodash.defaultsDeep(comp, components[comp?.type]),
  );

  normalizeNodes(schematic);
  normalizePorts(schematic);

  return isEqual(initialSchematic, schematic) ? schematic : { ...schematic };
}

export function useSchematicParser(schematic, setSchematic) {
  useEffect(() => {
    setSchematic(parseSchematic(schematic));
  }, [schematic, setSchematic]);
}
