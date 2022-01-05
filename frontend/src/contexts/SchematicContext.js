import React from 'react';

export const SchematicContext = React.createContext({
  data: {
    components: [],
    nodes: [],
    connections: [],
  },
});
