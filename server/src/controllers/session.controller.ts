import type { Request, Response } from 'express';

import * as repository from '../repositories/session.repository';
import * as service from '../services/session.service';

import AppError from '../config/error';
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
  const token: string = res.locals.token;

  const result = await repository.deleteOne(token);
  if (result.deletedCount === 0) {
    throw new AppError({
      statusCode: 500,
      message: 'Internal server error',
      detail: 'An unexpected error occurred while signing out',
    });
  }

  AppLog({ type: 'Controller', text: 'User signed out' });
  return res.sendStatus(200);
}
