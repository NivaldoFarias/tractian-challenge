import type { Request, Response, NextFunction } from "express";

import { apiKeyBelongsToCompany } from "./../middlewares/company.middleware";

export async function createOneValidations(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  const apiKey = res.locals.header;
  const company = res.locals.result;

  apiKeyBelongsToCompany(apiKey, company);

  return next();
}
