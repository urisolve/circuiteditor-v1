import { Schema } from 'mongoose';

export interface IPort {
  id: string;
  owner: string;
  connection: string;
  type: string;
  position: {
    x: number;
    y: number;
  };
}

export const portSchema = new Schema<IPort>(
  {
    id: String,
    owner: String,
    connection: String,
    type: { type: String },
    position: {
      x: Number,
      y: Number,
    },
  },
  { _id: false },
);
