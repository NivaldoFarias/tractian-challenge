import type { Request, Response } from "express";

import * as companyRepository from "../repositories/company.repository";
import * as repository from "../repositories/user.repository";
import * as service from "../services/user.service";

import { CreateUser } from "../types/user";
import AppLog from "../events/AppLog";

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
