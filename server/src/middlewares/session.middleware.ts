import type { Request, Response, NextFunction } from 'express';
import type { FindUserResponse, SignInBody } from '../types/User';

import * as repository from '../repositories/user.repository';
import * as service from '../services/session.service';

import AppError from '../config/error';
import AppLog from '../events/AppLog';

export async function signInValidations(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  const body: SignInBody = res.locals.body;
  const { username, password } = body;

  const result = await repository.findByField({
    field: 'username',
    value: username,
  });

  validateUser(result);
  validPassword(password, result?.password);

  res.locals.data = result;
  return next();
}

// Validations
function validateUser(user: FindUserResponse | null) {
  if (!user) {
    throw new AppError({
      statusCode: 404,
      message: 'User not found',
      detail:
        'Ensure to provide a username that corresponds to an existing user',
    });
  }

  return AppLog({ type: 'Middleware', text: 'User exists' });
}

function validPassword(providedPassword: string, password: string = '') {
  const isValid = service.decryptPassword(providedPassword, password);

  if (!isValid) {
    throw new AppError({
      statusCode: 403,
      message: 'Invalid password',
      detail: 'Ensure to provide a valid password',
    });
  }
  return AppLog({ type: 'Middleware', text: 'Valid password' });
}
