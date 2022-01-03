import lodash from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import { isConnected, nextChar } from '.';

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

export function generateNodeLabel(schematic, label = 'A') {
  // Check if label already exists
  for (const node of schematic.nodes) {
    if (node.label?.name !== label) continue;

    // Add another letter if there aren't any more
    const lastChar = label.slice(-1);
    if (lastChar === 'Z') return generateNodeLabel(schematic, label + 'A');

    // If there are more letters to cycle through
    const newLabel = label.slice(0, -1) + nextChar(lastChar);
    return generateNodeLabel(schematic, newLabel);
  }

  // Return the generated label
  return label;
}

export function generateNodesString(component, schematic) {
  let nodeStr = '';

  for (const port of component.ports) {
    // Check if the port is connected to somewhere
    const conn = schematic.connections.find((conn) => isConnected(port, conn));
    if (!conn) continue;

    // Search for the node (virtual or real) that is connected to the port
    const node = schematic.nodes.find((node) => isConnected(node, conn));

    // If the component is not fully connected
    if (!node) {
      nodeStr += '?';
      continue;
    }

    // Generate a name if the node doesn't have one
    if (!node.label) {
      node.label = { name: generateNodeLabel(schematic) };
    } else if (!node.label.name) {
      node.label.name = generateNodeLabel(schematic);
    }

    // Convert it into string
    nodeStr += node?.label.name + ' ';
  }

  // Trim the last space and return
  return lodash.trimEnd(nodeStr);
}
