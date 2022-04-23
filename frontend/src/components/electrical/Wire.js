import { v4 as uuidv4 } from 'uuid';

const WIRE_CENTER_OFFSET = 50;
const WIRE_DEFAULT_CENTER = {
  x: WIRE_CENTER_OFFSET,
  y: WIRE_CENTER_OFFSET,
};

export const Wire = ({ x, y } = WIRE_DEFAULT_CENTER) => {
  const [id1, id2] = [uuidv4(), uuidv4()];

  return {
    type: 'Wire',
    fullName: 'Wire',
    components: [],
    connections: [
      {
        start: id1,
        end: id2,
        gridBreak: '50%',
      },
    ],
    nodes: [
      {
        id: id1,
        position: {
          x: x - WIRE_CENTER_OFFSET,
          y: y - WIRE_CENTER_OFFSET,
        },
      },
      {
        id: id2,
        position: {
          x: x + WIRE_CENTER_OFFSET,
          y: y + WIRE_CENTER_OFFSET,
        },
      },
    ],
  };
};
