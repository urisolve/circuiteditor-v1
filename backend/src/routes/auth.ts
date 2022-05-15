import { AuthenticatedRequest } from '../auth';
import { ICircuit } from '../models';
import { isAuth } from '../middleware';
import { Request, Response } from 'express';
import { Router } from 'express';
import HttpStatusCodes from 'http-status-enum';
import passport from 'passport';

export const router = Router();

function simplifyUser(req: AuthenticatedRequest) {
  const user = req.user._doc;

  delete user.password;
  user.circuits.forEach((circuit: ICircuit) => delete circuit.schematic);

  return user;
}

router.get('/', isAuth, (req: Request, res: Response) => {
  res
    .status(HttpStatusCodes.OK)
    .send(simplifyUser(req as AuthenticatedRequest));
});

router.post(
  '/login',
  passport.authenticate('local-login'),
  (req: Request, res: Response) => {
    res
      .status(HttpStatusCodes.OK)
      .send(simplifyUser(req as AuthenticatedRequest));
  },
);

router.post(
  '/signup',
  passport.authenticate('local-signup'),
  (req: Request, res: Response) => {
    res.status(HttpStatusCodes.CREATED).send('User created successfully');
  },
);

router.get('/logout', (req: Request, res: Response) => {
  req.session.destroy(function (error) {
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
});
