import lodash from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import { isConnected } from '../../util';

export function generateVirtualNode(schematic, virtualCount = 0) {
  // Check if there are nodes that match the name
  for (const node of schematic.nodes) {
    const pattern = new RegExp(`_net${virtualCount}`);

    // If the name already exists, try another one
    if (pattern.test(node.label?.name))
      return generateVirtualNode(schematic, ++virtualCount);
  }

  // Return the successful Virtual Node
  return {
    id: uuidv4(),
    type: 'virtual',
    label: { name: `_net${virtualCount}` },
  };
}

// TODO: Generate human-friendly node labels
export function generateNodeLabel(schematic) {}

export function generateNodesString(component, schematic) {
  let nodeStr = '';

  for (const port of component.ports) {
    // Check if the port is connected to somewhere
    const conn = schematic.connections.find((conn) => isConnected(port, conn));
    if (!conn) continue;

    // Search for the node (virtual or real) that is connected to the port
    const node = schematic.nodes.find((node) => isConnected(node, conn));

    // Convert it into string
    nodeStr +=
      (node?.label?.name ?? generateNodeLabel(schematic) ?? node?.id ?? '?') +
      ' ';
  }

  // Trim the last space and return
  return lodash.trimEnd(nodeStr);
}
