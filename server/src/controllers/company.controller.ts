import type { QueryParameters, UpdateResponse } from "../types/collections";
import type { CreateRequestBody } from "../types/company";
import type { Request, Response } from "express";

import * as errors from "./../middlewares/helpers/errors.middleware";
import * as repository from "./../repositories/company.repository";
import * as util from "./../utils/queries.util";

import AppLog from "../events/AppLog";

export async function create(_req: Request, res: Response) {
  const apiKey = res.locals.header;
  const { name }: CreateRequestBody = res.locals.body;

  await repository.create({ name, apiKey });

  AppLog({ type: "Controller", text: "Company created" });
  return res.sendStatus(201);
}

export async function searchAll(_req: Request, res: Response) {
  const queries: QueryParameters = res.locals.query;
  const companies = await util.searchAll({ queries, model: "Company" });

  AppLog({ type: "Controller", text: "Companies searched" });
  return res.status(200).send(companies);
}

export async function searchById(_req: Request, res: Response) {
  const id = res.locals.param;
  const company = await util.findById({ id, model: "Company" });

  AppLog({ type: "Controller", text: "Sent Company" });
  return res.status(200).send(company);
}

export async function update(_req: Request, res: Response) {
  const id = res.locals.param;
  const company = res.locals.company;
  const { name }: CreateRequestBody = res.locals.body;

  const response: UpdateResponse = {
    message: "Company updated",
  };

  const update = await repository.updateOne({
    id,
    name,
  });

  if (!update) errors.companyNotFoundById;

  const unchangedCompany = company.name === name;

  if (unchangedCompany) response.message = "No changes detected";
  else {
    response.detail = {
      ...response.detail,
      [name as string]: {
        previous: company.name as string,
        current: name,
      },
    };
  }

  AppLog({ type: "Controller", text: "Company updated" });
  return res.status(200).send(response);
}

export async function deleteOne(_req: Request, res: Response) {
  const id = res.locals.param;

  await util.deleteOne({ id, model: "Company" });

  AppLog({ type: "Controller", text: "Company deleted" });
  return res.sendStatus(200);
}
