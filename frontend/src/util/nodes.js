import { v4 as uuidv4 } from 'uuid';

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
