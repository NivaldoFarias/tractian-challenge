import type { NonNullCompanyDocument } from "../types/Collections";
import type { Request, Response, NextFunction } from "express";

import AppError from "../config/error";

interface ProvidedResult {
  apiKey: string;
  name: string;
}

export function updateOrDeleteOneValidations(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  const apiKey = res.locals.header;
  const company = res.locals.result;
  const user_id = res.locals.user_id;

  apiKeyBelongsToCompany(apiKey, company);
  companyContainsUser(user_id, company);

  return next();
}

export async function apiKeyMatchesCompanyName(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  const provided = {
    apiKey: res.locals.header,
    name: res.locals.body.name,
  };
  const result = {
    apiKey: res.locals.result["x-api-key"],
    name: res.locals.result.name,
    id: res.locals.result._id,
  };

  __determineError(provided, result);

  return next();

  function __determineError(provided: ProvidedResult, result: ProvidedResult) {
    if (provided.name !== result.name) companyNameMismatch();
    if (provided.apiKey !== result.apiKey) Forbidden();
  }
}

function apiKeyBelongsToCompany(
  apiKey: string | undefined,
  company: NonNullCompanyDocument,
) {
  if (company["x-api-key"] !== apiKey) Forbidden();
}

function companyContainsUser(
  user_id: string | undefined,
  company: NonNullCompanyDocument,
) {
  const validUser = company.users.some(
    (user) => user?._id?.toString() === user_id,
  );

  if (!validUser) ForbiddenToken();
}

function Forbidden() {
  throw new AppError({
    statusCode: 403,
    message: "Forbidden",
    detail: "The provided API key does not match the company",
  });
}

function ForbiddenToken() {
  throw new AppError({
    statusCode: 403,
    message: "Forbidden",
    detail: "Ensure to provide the registered API key for the user's company",
  });
}

function companyNameMismatch() {
  throw new AppError({
    statusCode: 400,
    message: "Company name mismatch",
    detail: "The provided company name does not match the company",
  });
}
