import { Schema } from 'mongoose';

export interface ILabel {
  id: string;
  owner: string;
  name: string;
  value: string;
  unit: string;
  position: {
    x: number;
    y: number;
  };
  isValueHidden: boolean;
  isNameHidden: boolean;
}

export const labelSchema = new Schema<ILabel>(
  {
    id: String,
    owner: String,
    name: String,
    value: String,
    unit: String,
    position: {
      x: Number,
      y: Number,
    },
    isValueHidden: Boolean,
    isNameHidden: Boolean,
  },
  { _id: false },
);
