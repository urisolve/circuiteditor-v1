import { Schema } from 'mongoose';
import { ILabel, labelSchema } from '.';

export interface IConnection {
  id: string;
  start: string;
  end: string;
  type: string;
  label: ILabel;
  properties: {
    color: string;
    stroke: number;
    decoration: {
      startPoint: string;
      endPoint: string;
    };
  };
}

export const connectionSchema = new Schema<IConnection>(
  {
    id: String,
    start: String,
    end: String,
    type: String,
    label: labelSchema,
    properties: {
      color: String,
      stroke: Number,
      decoration: {
        startPoint: String,
        endPoint: String,
      },
    },
  },
  { _id: false },
);
