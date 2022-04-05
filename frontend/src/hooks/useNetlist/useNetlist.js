import { useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid'
import lodash from 'lodash';

import {
  generateUniqueName,
  generateVirtualNode,
  isConnected,
  isConnectionRedundant,
  LabelOptions,
  moveConnection,
  numberPattern,
} from '../../util';
import { components } from '../../configs/components.config';

// TODO: Add more info to the header (author, date, ...)
const version = process.env.REACT_APP_VERSION ?? '1.0.0';
const netlistHeader = `# CircuitEditor v${version}\n\n`;

function splitPorts(schematic) {
  for (const component of schematic.components) {
    for (const port of component.ports) {
      // Grab all connections to the port
      const connections = schematic.connections.filter((connection) =>
        isConnected(port, connection),
      );

      // If the port had more than 1 connection, split it into a node
      if (connections.length > 1) {
        // Create a new node
        const newNode = { id: uuidv4() };
        schematic.nodes.push(newNode);

        // Connect the port to the new node
        schematic.connections.push({
          id: uuidv4(),
          start: port.id,
          end: newNode.id,
        });

        // Move old port's connections to the new node
        for (const connection of connections) {
          moveConnection(connection, port, newNode);
        }
      }
    }
  }
}

function applyGround(schematic) {
  for (const component of schematic.components) {
    // Ignore non-ground components
    if (component.type !== 'gnd') continue;

    // Find the ground node
    const [gndPort] = component.ports; // GND only has 1 port
    const gndNode = schematic.nodes.find((node) =>
      node.connections?.includes(gndPort.connection),
    );

    // Rename the node
    if (gndNode) {
      gndNode.label = { name: 'gnd' };
    }
  }
}

function condenseNodes(schematic) {
  for (const node of schematic.nodes) {
    // Grab all connections to this node
    const nodeConnections = schematic.connections.filter((connection) =>
      isConnected(node, connection),
    );

    // Grab all the nodes that are connected to this one
    const connectedNodes = schematic.nodes.filter((connectedNode) =>
      nodeConnections
        .map(
          (connection) =>
            isConnected(connectedNode, connection) && connectedNode !== node,
        )
        .some(Boolean),
    );

    // If the node is isolated, ignore it
    if (!connectedNodes.length) continue;

    // Move connections to new node
    // TODO: Also move the label
    for (const connectedNode of connectedNodes) {
      for (const connection of schematic.connections) {
        if (isConnected(connectedNode, connection)) {
          moveConnection(connection, connectedNode, node);
        }
      }
    }

    // Delete old nodes
    for (const connectedNode of connectedNodes) {
      const idx = connectedNodes.indexOf(connectedNode);
      schematic.nodes.splice(idx, 1);
    }

    // Delete useless old connections
    for (const connection of schematic.connections) {
      if (!isConnectionRedundant(connection)) continue;

      const idx = schematic.connections.indexOf(connection);
      schematic.connections.splice(idx, 1);
    }
  }
}

function withVirtualNodes(schematic) {
  for (const connection of schematic.connections) {
    // Search for all components that share this connection
    const connectors = schematic.components.filter((component) =>
      component.ports.find((port) => isConnected(port, connection)),
    );

    // If the connection is shared between 2 components,
    // create a new virtual node between them.
    if (connectors.length === 2) {
      // Create virtual node
      const virtualNode = generateVirtualNode(schematic);
      schematic.nodes.push(virtualNode);

      // Create new connection
      schematic.connections.push({
        id: uuidv4(),
        start: virtualNode.id,
        end: connection.end,
      });

      // Update old connection
      connection.end = virtualNode.id;
    }
  }
}

function generateNameString({ type, label: { name } }) {
  return `${type}:${name}`;
}

function generateNodesString(component, schematic) {
  let nodeStr = '';

  for (const port of component.ports) {
    const conn = schematic.connections.find((conn) => isConnected(port, conn));

    if (!conn) {
      throw new Error(
        `Component with ID "${component.id}" is not fully connected. Make sure all ports of the component are connected somewhere.`,
      );
    }

    // Search for the node (virtual or real) that is connected to the port
    const node = schematic.nodes.find((node) => isConnected(node, conn));

    // Generate a name if the node doesn't have one
    const uniqueName = generateUniqueName(
      schematic.nodes,
      LabelOptions.NUMERIC,
      '_net',
    );
    if (!node.label) node.label = { name: uniqueName };
    else if (!node.label.name) node.label.name = uniqueName;

    // Convert it into string
    nodeStr += node?.label.name + ' ';
  }

  // Trim the last space and return
  return lodash.trimEnd(nodeStr);
}

function generateValueString({ fullName, label: { value = '', unit = '' } }) {
  if (!value) return '';

  const defaultName = components[fullName]?.label?.name;
  const formattedValue = value.replace(new RegExp(numberPattern), '$& ');

  return `${defaultName}="${formattedValue}${unit}"`;
}

export function useNetlist(sch) {
  return useMemo(() => {
    // Clone the schematic to not change the circuit itself
    const schematic = lodash.cloneDeep(sch);

    // Normalize the schematic's data model
    splitPorts(schematic);
    condenseNodes(schematic);
    applyGround(schematic);
    withVirtualNodes(schematic);

    // Add each component to the netlist
    let netlist = netlistHeader;
    for (const component of schematic.components) {
      if (component.type === 'gnd') continue;

      try {
        const nameStr = generateNameString(component);
        const nodesStr = generateNodesString(component, schematic);
        const valueStr = generateValueString(component);

        netlist += `${nameStr} ${nodesStr} ${valueStr}\n`;
      } catch (error) {}
    }

    return netlist;
  }, [sch]);
};
