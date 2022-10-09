import type { CreateRequestBody, QueryParameters } from "../types/Company";
import type { Request, Response } from "express";

import * as repository from "./../repositories/company.repository";
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
  const companies = await repository.searchAll(queries);

  AppLog({ type: "Controller", text: "Companies searched" });
  return res.status(200).send(companies);
}

export async function searchById(_req: Request, res: Response) {
  const id = res.locals.param;
  const company = await repository.searchById(id);

  AppLog({ type: "Controller", text: "Company searched" });
  return res.status(200).send(company);
}

export async function update(_req: Request, res: Response) {
  const apiKey = res.locals.header;
  const id = res.locals.param;
  const { name }: CreateRequestBody = res.locals.body;

  await repository.updateOne({ id, name, apiKey });

  AppLog({ type: "Controller", text: "Company updated" });
  return res.sendStatus(200);
}
