import { HydratedDocument } from 'mongoose';
import { IUser } from '../models';
import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user: HydratedDocument<IUser>;
}
