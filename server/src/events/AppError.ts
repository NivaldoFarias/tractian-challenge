import { Request, Response, NextFunction } from 'express';
import MongoServerError from '../mongo/MongoServerError';

import AppError from './../config/error';
import AppLog from './AppLog';

export default function ExceptionHandler(
  error: AppError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (!(error instanceof AppError)) {
    if (error.hasOwnProperty('code')) {
      const { code, keyValue, keyPattern }: MongoServerError =
        error as MongoServerError;

      if (code === 11000) {
        const key = Object.keys(keyPattern)[0];
        const capitalized =
          key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
        const value = keyValue[key];

        return res.status(409).json({
          message: `${capitalized} already registered`,
          detail: `Field '${key}' with value '${value}' already registered`,
        });
      }
    }

    AppLog({ type: 'Error', text: 'Internal server error' });
    return res.status(500).send({
      message: `Internal server error`,
      detail: error,
    });
  }
  const {
    properties: { log, statusCode, message, detail },
  } = error;

  AppLog({ type: 'Error', text: log ?? message });
  return res.status(statusCode).send({ message, detail });
}

export { AppError };
