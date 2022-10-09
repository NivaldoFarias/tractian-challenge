import type { Request, Response } from 'express';

import * as repository from '../repositories/user.repository';
import * as service from '../services/user.service';

import { CreateUser } from '../types/User';
import AppLog from '../events/AppLog';

export async function create(_req: Request, res: Response) {
  const { full_name, username, password, company }: CreateUser =
    res.locals.body;
  const encryptedPassword = service.hashPassword(password);

  await repository.create({
    full_name,
    username,
    password: encryptedPassword,
    company,
  });

  AppLog({ type: 'Controller', text: 'User created' });
  return res.sendStatus(201);
}
