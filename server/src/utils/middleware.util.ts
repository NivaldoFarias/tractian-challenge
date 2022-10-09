import type { Request, Response, NextFunction } from 'express';
import type { APIModelsKeys } from '../types/collection';
import type UseMiddleware from '../types/middleware';

import AppError from '../config/error';
import AppLog from '../events/AppLog';

import processHeader from './../middlewares/header.middleware';
import requireToken from './../middlewares/token.middleware';
import validateModel from '../middlewares/model.middleware';

function useMiddleware({
  middlewares,
  endpoint,
}: {
  middlewares?: UseMiddleware;
  endpoint: string;
}) {
  return async (req: Request, res: Response, next: NextFunction) => {
    AppLog({ type: 'Server', text: `Routing ...${endpoint}` });

    if (middlewares?.model) {
      await validateModel(middlewares.model, req.body);
      res.locals.body = req.body;
    }

    if (middlewares?.header) {
      processHeader(req.header(middlewares.header));
      res.locals.header = req.header(middlewares.header);
    }

    if (middlewares?.token) {
      const token = req.header('Authorization');
      if (typeof token !== 'string' || token.length === 0) {
        throw new AppError({
          statusCode: 401,
          message: 'Missing token',
          detail: 'Ensure to provide the required token',
        });
      }

      const parsedToken = __parseToken(token);
      res.locals.token = parsedToken;
      res.locals.user_id = await requireToken(parsedToken);
    }

    return next();
  };

  function __parseToken(header: string) {
    return header.replace('Bearer ', '').trim() ?? null;
  }
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

  AppLog({ type: 'Middleware', text: `${model} found` });
}

export function belongsToUser(entity: any, owner_id: number, model: string) {
  if (entity.user_id !== owner_id) {
    throw new AppError({
      statusCode: 409,
      message: `${model} owner id mismatch`,
      detail: `The provided ${model} does not belong to the user`,
    });
  }

  AppLog({ type: 'Middleware', text: `${model} belongs to user` });
}

export default useMiddleware;
