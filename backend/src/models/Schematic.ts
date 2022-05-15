import { Schema } from 'mongoose';
import {
  componentSchema,
  connectionSchema,
  IComponent,
  IConnection,
  INode,
  nodeSchema,
} from '.';

export interface ISchematic {
  components: IComponent[];
  nodes: INode[];
  connections: IConnection[];
}

export const schematicSchema = new Schema<ISchematic>(
  {
    components: [componentSchema],
    nodes: [nodeSchema],
    connections: [connectionSchema],
  },
  { _id: false },
);
