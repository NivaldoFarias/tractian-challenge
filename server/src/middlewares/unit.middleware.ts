import type { CompanyDocument, UnitDocument } from "../types/collections";
import type { Request, Response, NextFunction } from "express";
import type { UpdateOne } from "../types/unit";

import * as companyMiddleware from "./company.middleware";
import * as error from "./helpers/errors.middleware";
import * as util from "./../utils/queries.util";

import { companyExists } from "./user.middleware";

export async function createOneValidations(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  const apiKey = res.locals.header;
  const company = res.locals.company;
  const company_id = res.locals.body?.company;

  const validCompany = (await util.findById({
    id: company_id,
    model: "Company",
  })) as CompanyDocument;

  companyExists(validCompany);
  companyMiddleware.apiKeyBelongsToCompany(apiKey, company);

  return next();
}

export async function updateOrDeleteOneValidations(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const fieldsToUpdate: UpdateOne = { ...req.body };
  const apiKey = res.locals.header;
  const unit: NonNullable<UnitDocument> = res.locals.result;

  const company = (await util.findByField({
    field: "x-api-key",
    value: apiKey,
    model: "Company",
  })) as CompanyDocument;

  companyExists(company);
  companyContainsUnit(company as NonNullable<CompanyDocument>, unit);

  res.locals.body = fieldsToUpdate;

  return next();
}

function companyContainsUnit(
  company: NonNullable<CompanyDocument>,
  providedUnit: NonNullable<UnitDocument>,
) {
  const validUnit = company.units.some(
    (unit) => unit._id?.toString() === providedUnit._id.toString(),
  );

  if (!validUnit) error.unitDoesNotBelongToCompany();
}
