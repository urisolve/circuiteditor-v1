import { v4 as uuidv4 } from 'uuid';
import { constants } from '../constants';

export const Marker = (position) => ({
  type: 'Marker',
  fullName: 'Marker',

  components: [],
  connections: [],
  nodes: [
    {
      id: uuidv4(),
      label: {
        unit: 'V',
        isValueHidden: true,
      },
      position,
      properties: {
        color: constants.DEFAULT_WIRE_COLOR,
        radius: constants.DEFAULT_NODE_RADIUS,
      },
    },
  ],
});
