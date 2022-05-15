import { model, Schema } from 'mongoose';
import { circuitSchema, ICircuit, ISettings, settingsSchema } from '.';

export interface Document<T> {
  _doc: T;
}

export interface IUser extends Document<IUser> {
  email: string;
  firstName: string;
  lastName: string;
  mechNumber: number;
  institution: string;
  password: string;
  settings: ISettings;
  circuits: ICircuit[];
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    mechNumber: { type: Number, required: true },
    institution: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    settings: settingsSchema,
    circuits: [circuitSchema],
  },
  { timestamps: true },
);

export const User = model<IUser>('User', userSchema);
