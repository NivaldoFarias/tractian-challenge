import type { CompanyDocument, UserDocument } from "../types/collections";
import type { Request, Response, NextFunction } from "express";
import type { UpdateOne } from "../types/user";

import * as companyMiddleware from "./company.middleware";
import * as error from "./helpers/errors.middleware";
import * as util from "./../utils/queries.util";

export async function createOneValidations(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  const company = res.locals.company;
  const apiKey = res.locals.header;
  const companyName = res.locals.body?.company;

  const validCompany = (await util.findByField({
    field: "name",
    value: companyName,
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
  const fieldsToUpdate: UpdateOne = {
    full_name: req.body.full_name,
    username: req.body.username,
    company: req.body.company,
  };
  const user_id = res.locals.user_id;
  const company = res.locals.company;
  const user = res.locals.result;

  companyExists(company);
  providedTokenMatchesUser(user_id, user);
  changeCompany(fieldsToUpdate, user_id, company);

  res.locals.body = fieldsToUpdate;

  return next();
}

function changeCompany(
  fieldsToUpdate: UpdateOne,
  user_id: string,
  company: NonNullable<CompanyDocument>,
) {
  if (fieldsToUpdate.company) {
    companyMiddleware.companyContainsUser(
      user_id,
      company as NonNullable<CompanyDocument>,
    );
  }
}

function providedTokenMatchesUser(
  user_id: string,
  user: NonNullable<UserDocument>,
) {
  if (user_id !== user._id.toString()) error.ForbiddenToken();
}

export function companyExists(company: CompanyDocument) {
  if (!company) error.companyNotFound();
}
