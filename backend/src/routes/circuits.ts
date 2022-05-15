import { AuthenticatedRequest } from '../auth';
import { constants } from '../constants';
import { ICircuit } from '../models';
import { isAuth } from '../middleware';
import { NextFunction, Request, Response, Router } from 'express';
import { HydratedDocument, Types } from 'mongoose';
import { User } from '../models';
import dotenv from 'dotenv';
import HttpStatusCodes from 'http-status-enum';
import passport from 'passport';

dotenv.config();

export const router = Router();

function hasCircuitID(req: Request, res: Response, next: NextFunction) {
  if (req.query.id) next();
  else
    res
      .status(HttpStatusCodes.BAD_REQUEST)
      .send("The circuit's ID was not provided");
}

router.get('/', isAuth, async (req: AuthenticatedRequest, res: Response) => {
  res.status(HttpStatusCodes.OK).json(
    req.user._doc.circuits.map((circuit: ICircuit) => {
      delete circuit.schematic;
      return circuit;
    }),
  );
});

router.post('/', isAuth, async (req: AuthenticatedRequest, res: Response) => {
  if (req.user.circuits.length >= constants.MAX_CIRCUITS) {
    return res
      .status(HttpStatusCodes.FORBIDDEN)
      .send(`The limit of ${constants.MAX_CIRCUITS} circuits has been reached`);
  }

  req.user.circuits.push(req.body);
  req.user.save();

  res.status(HttpStatusCodes.CREATED).send('Circuit created');
});

router.patch('/', isAuth, hasCircuitID, async (req: Request, res: Response) => {
  await User.updateOne(
    { 'circuits._id': new Types.ObjectId(req.query.id as string) },
    {
      $set: {
        'circuits.$.schematic': req.body.schematic,
        'circuits.$.name': req.body.name,
        'circuits.$.description': req.body.description,
        'circuits.$.isStared': req.body.isStared,
        'circuits.$.thumbnail': req.body.thumbnail,
      },
    },
    {
      omitUndefined: true,
      timestamps:
        req.body.timestamps !== undefined ? req.body.timestamps : true,
    },
  )
    .then(() => res.status(HttpStatusCodes.OK).send('Circuit updated'))
    .catch((error) => res.status(HttpStatusCodes.BAD_REQUEST).send(error));
});

router.delete(
  '/',
  isAuth,
  hasCircuitID,
  async (req: AuthenticatedRequest, res: Response) => {
    req.user.circuits = req.user.circuits.filter(
      (circuit: HydratedDocument<ICircuit>) =>
        circuit._id.toString() !== req.query.id,
    );
    req.user.save();
    res.status(HttpStatusCodes.OK).send('Circuit deleted (if it existed)');
  },
);
