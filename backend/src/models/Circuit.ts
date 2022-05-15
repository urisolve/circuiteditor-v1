import { Schema } from 'mongoose';
import { ISchematic, schematicSchema } from '.';

export interface ICircuit {
  schematic: ISchematic;
  name: string;
  description: string;
  isStared: boolean;
  thumbnail: string;
}

export const circuitSchema = new Schema<ICircuit>(
  {
    schematic: {
      type: schematicSchema,
      default: { components: [], nodes: [], connections: [] },
    },
    name: { type: String, default: 'Untitled Circuit' },
    description: { type: String, default: '' },
    isStared: { type: Boolean, default: false },
    thumbnail: String,
  },
  { timestamps: true },
);
