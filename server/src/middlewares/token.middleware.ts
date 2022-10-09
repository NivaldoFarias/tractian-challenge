import jwt, { JwtPayload } from 'jsonwebtoken';

import { env } from '../utils/constants.util';

import AppError from '../config/error';
import AppLog from '../events/AppLog';

async function requireToken(token: string) {
  let id: string | undefined = undefined;

  try {
    const payload: JwtPayload = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    const { sub } = payload;

    id = payload[sub ?? env.JWT_SUBJECT];
  } catch (error: any) {
    throw new AppError({
      log: error,
      statusCode: 403,
      message: `Forbidden`,
      detail: 'The token provided is invalid',
    });
  }

  AppLog({ type: 'Middleware', text: 'Valid token' });
  return id;
}

export default requireToken;
