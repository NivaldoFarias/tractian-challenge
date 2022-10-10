import type { QueryParameters } from "../types/collections";
import type { CreateUser, UpdateOne } from "../types/user";
import type { UpdateWriteOpResult } from "mongoose";
import type { Request, Response } from "express";

import * as companyRepository from "../repositories/company.repository";
import * as repository from "../repositories/user.repository";
import * as service from "../services/user.service";
import * as util from "./../utils/queries.util";

import AppError from "../config/error";
import AppLog from "../events/AppLog";

interface UpdateResponse {
  message: string;
  detail?: Partial<UpdateWriteOpResult>;
}

export async function create(_req: Request, res: Response) {
  const body: CreateUser = res.locals.body;
  const { company } = body;

  delete body.company;
  body.password = service.hashPassword(body.password);

  const pushUserData = await repository.create(body);
  await companyRepository.pushUser(company as string, pushUserData);

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
    full_name: body.full_name ?? result.full_name,
    username: body.username ?? result.username,
  });
  const { matchedCount, modifiedCount } = update;

  if (!matchedCount) {
    throw new AppError({
      statusCode: 404,
      message: "User not found",
      detail: "Ensure to provide a valid user id",
    });
  } else if (!modifiedCount) {
    response.message = "No changes detected";
  } else {
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
}

export async function deleteOne(_req: Request, res: Response) {
  const id = res.locals.param;

  await repository.deleteOne(id);

  AppLog({ type: "Controller", text: "User deleted" });
  return res.sendStatus(200);
}
