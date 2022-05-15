import { NextFunction, Request, Response } from 'express';
import HttpStatusCodes from 'http-status-enum';

export function isAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.isAuthenticated()) {
    res.status(HttpStatusCodes.UNAUTHORIZED).send('Login to use this resource');
  } else {
    next();
  }
}
