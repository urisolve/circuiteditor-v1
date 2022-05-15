import { Schema } from 'mongoose';
import { ILabel, labelSchema } from '.';

export interface INode {
  id: string;
  connections: string[];
  type: string;
  position: {
    x: number;
    y: number;
  };
  label: ILabel;
  properties: {
    color: string;
    radius: number;
  };
}

export const nodeSchema = new Schema<INode>(
  {
    id: String,
    connections: [String],
    type: String,
    position: {
      x: Number,
      y: Number,
    },
    label: labelSchema,
    properties: {
      color: String,
      radius: Number,
    },
  },
  { _id: false },
);
