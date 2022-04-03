import { v4 as uuidv4 } from 'uuid';

import { nextChar } from '.';

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
