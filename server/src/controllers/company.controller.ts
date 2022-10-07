import type { CreateBody } from '../types/Company';
import type { Request, Response } from 'express';

import * as repository from './../repositories/company.repository';
import AppLog from '../events/AppLog';
import AppError from '../config/error';

export async function create(req: Request, res: Response) {
  const apiKey = req.header('x-api-key');
  const { name }: CreateBody = req.body;

  if (!apiKey) {
    throw new AppError(
      'Missing x-api-key',
      401,
      'Missing x-api-key',
      'Ensure to provide the x-api-key header',
    );
  } else if (!name) {
    throw new AppError(
      'Invalid Request Input',
      422,
      'Invalid Request Input',
      'Ensure to provide the "name" field',
    );
  }

  await repository.create({ name, apiKey });

  AppLog('Controller', 'Company created');
  return res.sendStatus(201);
}
