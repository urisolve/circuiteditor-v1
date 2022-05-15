import { Schema } from 'mongoose';
import { ILabel, IPort, labelSchema, portSchema } from '.';

export interface IComponent {
  id: string;
  type: string;
  fullName: string;
  ports: IPort[];
  position: {
    x: number;
    y: number;
    angle: number;
  };
  label: ILabel;
  properties: any;
}

export const componentSchema = new Schema<IComponent>(
  {
    id: String,
    type: String,
    fullName: String,
    ports: [portSchema],
    position: {
      x: Number,
      y: Number,
      angle: Number,
    },
    label: labelSchema,
    properties: Schema.Types.Mixed,
  },
  { _id: false },
);
