import type { Request, Response, NextFunction } from "express";
import type { CompanyDocument } from "../types/Company";

import * as queries from "./../utils/queries.util";
import AppError from "../config/error";

interface ProvidedResult {
  apiKey: string;
  name: string;
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

export async function apiKeyBelongsToCompany(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  const apiKey = res.locals.header;
  const result = res.locals.result;

  if (result["x-api-key"] !== apiKey) Forbidden();

  return next();
}

function Forbidden() {
  throw new AppError({
    statusCode: 403,
    message: "Forbidden",
    detail: "The provided API key does not match the company",
  });
}

function companyNameMismatch() {
  throw new AppError({
    statusCode: 400,
    message: "Company name mismatch",
    detail: "The provided company name does not match the company",
  });
}
