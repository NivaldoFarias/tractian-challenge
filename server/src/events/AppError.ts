import { MongooseError, Error as ExtendedError } from 'mongoose';
import { Request, Response, NextFunction } from 'express';

import AppError from './../config/error';
import AppLog from './AppLog';
import HandleMongoError from '../mongo/errors';

export default function ExceptionHandler(
  error: MongooseError | AppError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  console.log(error);
  if (error instanceof ExtendedError) {
    const { statusCode, message, detail } = HandleMongoError(error);

    AppLog('Error', message);
    return res.status(statusCode).send({ message, detail });
  } else if (error instanceof AppError) {
    const { log, statusCode, message, detail } = error;

    AppLog('Error', log ?? message);
    return res.status(statusCode).send({ message, detail });
  }

  AppLog('Error', 'Internal server error');
  return res.status(500).send({
    message: `Internal server error`,
    detail: error,
  });
}

export { AppError };
