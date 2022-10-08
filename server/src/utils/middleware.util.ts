import { Request, Response, NextFunction } from 'express';

import UseMiddleware from '../types/middleware';

import AppLog from '../events/AppLog';
import AppError from '../config/error';

import validateSchema from './../middlewares/schema.middleware';
import processHeader from './../middlewares/header.middleware';
import requireToken from './../middlewares/token.middleware';
import { APIModelsKeys } from '../types/collection';

function useMiddleware(middlewares: UseMiddleware, endpoint: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    AppLog('Server', `Routing ...${endpoint}`);

    if (middlewares.model) {
      await validateSchema(middlewares.model, req.body);
      res.locals.body = req.body;
    }

    if (middlewares.header) {
      processHeader(req.header(middlewares.header));
      res.locals.header = req.header(middlewares.header);
    }

    if (middlewares.token) {
      const token = req.header('Authorization');
      if (!token) {
        throw new AppError({
          statusCode: 401,
          message: 'Missing token',
          detail: 'Ensure to provide the required token',
        });
      }

      processHeader(token);
      res.locals.subject = await requireToken(token ?? '');
    }

    return next();
  };
}

/* export function validateParameters(id: number) {
  if (!id || isNaN(id)) {
    throw new AppError(
      'Invalid parameters',
      400,
      'Invalid parameters',
      'Ensure to provide the required parameters',
    );
  }

  AppLog('Middleware', 'Valid ID');
} */

export function entityExists(
  entity: APIModelsKeys | null,
  model: APIModelsKeys,
) {
  if (!entity) {
    throw new AppError({
      statusCode: 404,
      message: `${model} not found`,
      detail: 'Ensure to provide a valid ID',
    });
  }

  AppLog('Middleware', `${model} found`);
}

export function belongsToUser(entity: any, owner_id: number, model: string) {
  if (entity.user_id !== owner_id) {
    throw new AppError({
      statusCode: 409,
      message: `${model} owner id mismatch`,
      detail: `The provided ${model} does not belong to the user`,
    });
  }

  AppLog('Middleware', `${model} belongs to user`);
}

export default useMiddleware;
