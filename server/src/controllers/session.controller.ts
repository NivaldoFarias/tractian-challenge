import type { Request, Response } from 'express';

import * as repository from '../repositories/session.repository';
import * as service from '../services/session.service';
import AppLog from '../events/AppLog';

export async function signIn(_req: Request, res: Response) {
  const {
    data: { id, username },
  } = res.locals;

  const token = service.generateToken(id);
  await repository.create({ username, token });

  AppLog({ type: 'Controller', text: 'User signed in' });
  return res.status(200).send({ token });
}

export async function signOut(_req: Request, res: Response) {
  const { token } = res.locals;

  await repository.deleteOne(token);

  AppLog({ type: 'Controller', text: 'User signed out' });
  return res.sendStatus(200);
}
