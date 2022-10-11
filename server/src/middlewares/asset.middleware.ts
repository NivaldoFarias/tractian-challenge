import type { UnitDocument, CompanyDocument } from "../types/collections";
import type { Request, Response, NextFunction } from "express";
import type { UpdateOne } from "../types/asset";

import * as util from "./../utils/queries.util";
import * as error from "./helpers/errors.middleware";
import { companyExists } from "./user.middleware";

export async function createOneValidations(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  const company: CompanyDocument = res.locals.company;
  const unit: UnitDocument = res.locals.result;

  companyExists(company);
  unitExists(unit);

  return next();
}

export async function updateOrDeleteOneValidations(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const company: NonNullable<CompanyDocument> = res.locals.company;
  const fieldsToUpdate: UpdateOne = { ...req.body };
  const asset_id = res.locals.param;

  const unit = __findUnit(company, asset_id);
  if (!unit || typeof unit === "undefined") error.unitNotFound();

  const unitDoc = (await util.findById({
    id: (unit?._id?.toString() as string) ?? "",
    model: "Unit",
  })) as UnitDocument;

  if (!unitDoc) error.unitNotFound();

  res.locals.body = fieldsToUpdate;
  res.locals.unit = unitDoc;

  return next();
}

function unitExists(unit: UnitDocument) {
  if (!unit) error.unitNotFound();
}

function __findUnit(company: NonNullable<CompanyDocument>, asset_id: string) {
  return company.units.find((unit) => {
    return unit.assets.find((asset) => {
      return asset._id.toString() === asset_id;
    });
  });
}
