import jwt, { JwtPayload } from 'jsonwebtoken';

import { env } from '../utils/constants.util';

import AppError from '../config/error';
import AppLog from '../events/AppLog';

async function requireToken(authorization: string) {
  const token = __parseToken(authorization);
  let subject = null;

  try {
    const { sub } = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    subject = sub;
  } catch (error: any) {
    throw new AppError({
      statusCode: 403,
      message: `Invalid token`,
      detail: error,
    });
  }

  AppLog({ type: 'Middleware', text: 'Valid token' });
  return subject;
}

function __parseToken(header: string) {
  return header.replace('Bearer ', '').trim() ?? null;
}

export default requireToken;
