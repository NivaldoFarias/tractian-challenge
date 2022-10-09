import type { FindUserResponse, SignInBody, FindSessionResponse } from "../types/User";
import type { Request, Response, NextFunction } from "express";

import * as repository from "../repositories/session.repository";
import * as user from "../repositories/user.repository";
import * as service from "../services/session.service";

import AppError from "../config/error";
import AppLog from "../events/AppLog";

export async function signInValidations(_req: Request, res: Response, next: NextFunction) {
  const { username, password }: SignInBody = res.locals.body;

  const result = await user.findByField({
    field: "username",
    value: username,
  });

  validateUser(result);
  validPassword(password, result?.password);

  res.locals.data = result;
  return next();
}

export async function signOutValidations(_req: Request, res: Response, next: NextFunction) {
  const token: string = res.locals.token;

  const result = await repository.findByField({
    field: "token",
    value: token,
  });

  validateSession(result);

  res.locals.data = result;
  return next();
}

// Validations
function validateUser(user: FindUserResponse | null) {
  if (!user) {
    throw new AppError({
      statusCode: 404,
      message: "User not found",
      detail: "Ensure to provide a username that corresponds to an existing user",
    });
  }

  return AppLog({ type: "Middleware", text: "User exists" });
}

function validPassword(providedPassword: string, password = "") {
  const isValid = service.decryptPassword(providedPassword, password);

  if (!isValid) {
    throw new AppError({
      statusCode: 403,
      message: "Invalid password",
      detail: "Ensure to provide a valid password",
    });
  }
  return AppLog({ type: "Middleware", text: "Valid password" });
}

function validateSession(session: FindSessionResponse | null) {
  if (!session) {
    throw new AppError({
      statusCode: 404,
      message: "Session not found",
      detail: "Ensure to provide a token that corresponds to an existing session",
    });
  } else if (session.active === false) {
    throw new AppError({
      statusCode: 403,
      message: "Session expired",
      detail: "Ensure to provide a token that corresponds to an active session",
    });
  }

  return AppLog({ type: "Middleware", text: "Session exists" });
}
