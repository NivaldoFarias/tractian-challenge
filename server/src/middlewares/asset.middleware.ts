import type {
  UnitDocument,
  AssetDocument,
  CompanyDocument,
} from "../types/collections";
import type { Request, Response, NextFunction } from "express";
import type { UpdateOne } from "../types/asset";

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
  const fieldsToUpdate: UpdateOne = { ...req.body };
  const unit = res.locals.unit;
  const asset: NonNullable<AssetDocument> = res.locals.result;

  unitContainsAsset(unit as NonNullable<UnitDocument>, asset);

  res.locals.body = fieldsToUpdate;

  return next();
}

function unitContainsAsset(
  unit: NonNullable<UnitDocument>,
  providedAsset: NonNullable<AssetDocument>,
) {
  const validAsset = unit.assets.some(
    (asset) => asset._id?.toString() === providedAsset._id.toString(),
  );

  if (!validAsset) error.assetDoesNotBelongToUnit();
}
