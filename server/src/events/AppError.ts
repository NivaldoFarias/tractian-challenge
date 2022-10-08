import { Request, Response, NextFunction } from 'express';

import AppError from './../config/error';
import AppLog from './AppLog';

export default function ExceptionHandler(
  error: AppError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (!(error instanceof AppError)) {
    AppLog('Error', 'Internal server error');
    return res.status(500).send({
      message: `Internal server error`,
      detail: error,
    });
  }
  const {
    properties: { log, statusCode, message, detail },
  } = error;

  AppLog('Error', log ?? message);
  return res.status(statusCode).send({ message, detail });
}

export { AppError };
