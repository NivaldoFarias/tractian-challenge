import type { NonNullCompanyDocument } from "../types/collections";
import type { Request, Response, NextFunction } from "express";
import { Forbidden, ForbiddenToken } from "./helpers/errors.middleware";

export function updateOrDeleteOneValidations(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  const apiKey = res.locals.header;
  const company = res.locals.company;
  const user_id = res.locals.user_id;

  apiKeyBelongsToCompany(apiKey, company);
  companyContainsUser(user_id, company);

  return next();
}

export function apiKeyBelongsToCompany(
  apiKey: string | undefined,
  company: NonNullCompanyDocument,
) {
  if (company["x-api-key"] !== apiKey) Forbidden();
}

export function companyContainsUser(
  user_id: string | undefined,
  company: NonNullCompanyDocument,
) {
  const validUser = company.users.some(
    (user) => user?._id?.toString() === user_id,
  );

  if (!validUser) ForbiddenToken();
}
