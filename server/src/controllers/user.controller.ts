import type {
  CompanyDocument,
  QueryParameters,
  UpdateResponse,
  UserDocument,
} from "../types/collections";
import type { CreateUser, UpdateOne } from "../types/user";
import type { Request, Response } from "express";

import * as companyRepository from "../repositories/company.repository";
import * as error from "./../middlewares/helpers/errors.middleware";
import * as repository from "../repositories/user.repository";
import * as service from "../services/user.service";
import * as util from "./../utils/queries.util";

import AppLog from "../events/AppLog";

export async function create(_req: Request, res: Response) {
  const { _id }: NonNullable<CompanyDocument> = res.locals.company;
  const body: CreateUser = res.locals.body;

  delete body.company;
  body.password = service.hashPassword(body.password);

  const pushUserData = await repository.create(body);
  await companyRepository.pushIntoArray({
    id: _id.toString(),
    data: pushUserData,
    array: "users",
  });

  AppLog({
    type: "Controller",
    text: "User created and inserted into Company",
  });
  return res.sendStatus(201);
}

export async function searchAll(_req: Request, res: Response) {
  const queries: QueryParameters = res.locals.query;
  const users = await util.searchAll({ queries, model: "User" });

  AppLog({ type: "Controller", text: "Companies searched" });
  return res.status(200).send(users);
}

export async function searchById(_req: Request, res: Response) {
  const id = res.locals.param;
  const user = await util.findById({ id, model: "User" });

  AppLog({ type: "Controller", text: "Sent User" });
  return res.status(200).send(user);
}

export async function updateOne(_req: Request, res: Response) {
  const id = res.locals.param;
  const result = res.locals.result;
  const body: UpdateOne = res.locals.body;

  const response: UpdateResponse = {
    message: "User updated",
  };

  const update = await repository.updateOne({
    id,
    body,
  });

  if (!update) error.userNotFound();

  const unchangedUser = __iterateKeyValues(body, result);

  if (unchangedUser) response.message = "No changes detected";
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

  AppLog({ type: "Controller", text: "User updated" });
  return res.status(200).send(response);

  function __iterateKeyValues(
    body: UpdateOne,
    result: NonNullable<UserDocument>,
  ) {
    return Object.entries(body).every(([key, value]) => {
      return value === result[key as keyof NonNullable<UserDocument>];
    });
  }
}

export async function deleteOne(_req: Request, res: Response) {
  const id = res.locals.param;

  await util.deleteOne({ id, model: "User" });

  AppLog({ type: "Controller", text: "User deleted" });
  return res.sendStatus(200);
}
