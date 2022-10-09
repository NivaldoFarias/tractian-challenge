import type { Request, Response, NextFunction } from "express";

import * as companyRepository from "./../repositories/company.repository";
import AppError from "../config/error";

export async function apiKeyMatchesCompany(_req: Request, res: Response, next: NextFunction) {
  const apiKey = res.locals.header;
  const { company } = res.locals.body;

  const result = await companyRepository.findByNameAndApiKey({
    company,
    apiKey,
  });

  if (!result) {
    throw new AppError({
      statusCode: 401,
      message: "Unauthorized",
      detail: "Ensure to provide a valid API key",
    });
  }

  return next();
}
