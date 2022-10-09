import type { Request, Response, NextFunction } from "express";
import AppError from "../config/error";

import * as repository from "./../repositories/company.repository";

export async function apiKeyMatchesCompanyName(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  const apiKey = res.locals.header;
  const { name } = res.locals.body;

  const result = await repository.findByNameAndApiKey({
    company: name,
    apiKey,
  });

  if (!result) {
    throw new AppError({
      statusCode: 403,
      message: "Company and API key mismatch",
      detail: "Ensure to provide a valid API key",
    });
  }

  return next();
}
