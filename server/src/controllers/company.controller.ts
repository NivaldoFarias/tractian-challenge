import type { QueryParameters } from "../types/collections";
import type { CreateRequestBody } from "../types/company";
import type { Request, Response } from "express";

import * as repository from "./../repositories/company.repository";
import * as util from "./../utils/queries.util";

import AppLog from "../events/AppLog";
import AppError from "../config/error";

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
  const { name }: CreateRequestBody = res.locals.body;

  const { matchedCount, modifiedCount } = await repository.updateOne({
    id,
    name,
  });

  if (!matchedCount) {
    throw new AppError({
      statusCode: 404,
      message: "Company not found",
      detail: "Ensure to provide a valid company id",
    });
  } else if (!modifiedCount) {
    throw new AppError({
      statusCode: 400,
      message: "No changes detected",
      detail: "Ensure to provide a different name",
    });
  }

  AppLog({ type: "Controller", text: "Company updated" });
  return res.sendStatus(200);
}

export async function deleteOne(_req: Request, res: Response) {
  const id = res.locals.param;

  await repository.deleteOne(id);

  AppLog({ type: "Controller", text: "Company deleted" });
  return res.sendStatus(200);
}
