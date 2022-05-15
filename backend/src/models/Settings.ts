import { Schema } from 'mongoose';

export interface ISettings {
  darkMode: boolean;
}

// TODO: Update this schema
export const settingsSchema = new Schema<ISettings>(
  {
    darkMode: { type: Boolean, default: false },
    /*
    connections: {
      color: { type: String, default: '#808080' },
      stroke: { type: Number, default: 5 },
    },
    nodes: {
      color: { type: String, default: '#808080' },
      radius: { type: Number, default: 10 },
    },
    */
  },
  { _id: false },
);
