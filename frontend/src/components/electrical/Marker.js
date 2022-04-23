import { v4 as uuidv4 } from 'uuid';

export const Marker = (position) => ({
  type: 'Marker',
  fullName: 'Marker',
  components: [],
  connections: [],
  nodes: [
    {
      id: uuidv4(),
      position,
    },
  ],
});
