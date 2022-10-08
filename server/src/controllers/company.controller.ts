import type { CreateRequestBody } from '../types/Company';
import type { Request, Response } from 'express';

import * as repository from './../repositories/company.repository';
import AppLog from '../events/AppLog';

export async function create(_req: Request, res: Response) {
  const apiKey = res.locals.header;
  const { name }: CreateRequestBody = res.locals.body;

  await repository.create({ name, apiKey });

  AppLog('Controller', 'Company created');
  return res.sendStatus(201);
}
