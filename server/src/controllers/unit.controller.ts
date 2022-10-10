import type {
  CompanyDocument,
  QueryParameters,
  UnitDocument,
  UpdateResponse,
} from "../types/collections";
import type { CreateRequestBody, UpdateOne } from "../types/unit";
import type { Request, Response } from "express";

import * as companyRepository from "../repositories/company.repository";
import * as error from "./../middlewares/helpers/errors.middleware";
import * as repository from "./../repositories/unit.repository";
import * as util from "./../utils/queries.util";

import AppLog from "../events/AppLog";

export async function create(_req: Request, res: Response) {
  const { _id }: NonNullable<CompanyDocument> = res.locals.company;
  const body: CreateRequestBody = res.locals.body;

  delete body.company;

  const pushUnitData = await repository.create(body);
  await companyRepository.pushIntoArray({
    id: _id.toString(),
    data: pushUnitData,
    array: "units",
  });

  AppLog({ type: "Controller", text: "Unit created" });
  return res.sendStatus(201);
}

export async function searchAll(_req: Request, res: Response) {
  const queries: QueryParameters = res.locals.query;
  const units = await util.searchAll({ queries, model: "Unit" });

  AppLog({ type: "Controller", text: "Units searched" });
  return res.status(200).send(units);
}

export async function searchById(_req: Request, res: Response) {
  const id = res.locals.param;
  const unit = await util.findById({ id, model: "Unit" });

  AppLog({ type: "Controller", text: "Sent Unit" });
  return res.status(200).send(unit);
}

export async function update(_req: Request, res: Response) {
  const id = res.locals.param;
  const result = res.locals.result;
  const body: UpdateOne = res.locals.body;

  const response: UpdateResponse = {
    message: "Unit updated",
  };

  const update = await repository.updateOne({
    id,
    body,
  });

  if (!update) error.unitNotFound();

  const unchangedUnit = Object.values(
    update as NonNullable<UnitDocument>,
  ).every((field) => {
    return field === result[field];
  });

  if (unchangedUnit) response.message = "No changes detected";
  else {
    for (const [key, value] of Object.entries(body)) {
      if (!value || value === result[key]) continue;

      response.detail = {
        ...response.detail,
        [key]: {
          previous: result[key],
          current: value,
        },
      };
    }
  }

  AppLog({ type: "Controller", text: "Unit updated" });
  return res.status(200).send(response);
}

export async function deleteOne(_req: Request, res: Response) {
  const id = res.locals.param;

  await util.deleteOne({ id, model: "Unit" });

  AppLog({ type: "Controller", text: "Unit deleted" });
  return res.sendStatus(200);
}
