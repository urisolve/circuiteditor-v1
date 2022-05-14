import { v4 as uuidv4 } from 'uuid';

export function generateVirtualNode(schematic, virtualCount = 0) {
  for (const node of schematic.nodes) {
    const pattern = new RegExp(`_net${virtualCount}`);

    if (pattern.test(node.label?.name)) {
      return generateVirtualNode(schematic, ++virtualCount);
    }
  }

  return {
    id: uuidv4(),
    type: 'virtual',
    label: { name: `_net${virtualCount}` },
  };
}
