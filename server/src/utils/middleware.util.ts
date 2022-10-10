import type { APIModelsKeys, QueriesGeneric } from "../types/collections";
import type { Request, Response, NextFunction } from "express";
import type {
  UseMiddleware,
  MiddlewarePromises,
  MiddlewareGlobals,
} from "../types/middleware";

import AppError from "../config/error";
import AppLog from "../events/AppLog";

import * as repository from "./queries.util";

import {
  validateParameters,
  validateModel,
  processHeader,
  requireToken,
  parseQueries,
} from "../middlewares/helpers";

export default function useMiddleware({
  middlewares,
  endpoint,
}: {
  middlewares?: UseMiddleware;
  endpoint: string;
}) {
  return async (req: Request, res: Response, next: NextFunction) => {
    AppLog({ type: "Server", text: `Routing ...${endpoint}` });

    const globals: MiddlewareGlobals = {
      token: undefined,
      id: undefined,
      header: undefined,
      model: middlewares?.model,
      param: middlewares?.param,
      body: req.body,
    };

    if (middlewares?.model) {
      res.locals.body = req.body;
    }

    if (middlewares?.header) {
      globals.header = req.header(middlewares.header);
      processHeader(globals.header);
      res.locals.header = globals.header;
    }

    if (middlewares?.token) {
      const token = req.header("Authorization");
      if (typeof token !== "string" || token.length === 0) {
        throw new AppError({
          statusCode: 401,
          message: "Missing token",
          detail: "Ensure to provide the required token",
        });
      }

      globals.token = __parseToken(token);
      res.locals.token = globals.token;

      function __parseToken(header: string) {
        return header.replace("Bearer ", "").trim() ?? null;
      }
    }

    if (middlewares?.query) {
      const queries: QueriesGeneric = req.query as QueriesGeneric;
      const parsedQueries = parseQueries(queries, middlewares.query);

      res.locals.query = parsedQueries;
    }

    if (middlewares?.param) {
      globals.id = req.params.id;
      res.locals.param = globals.id;
    }

    const tokenIsRequired = middlewares?.token && globals.token;
    const parameterIsRequired =
      middlewares?.param && globals.id && globals.param;
    const mustValidateModel =
      middlewares?.model && globals.body && globals.model;
    const searchCompanyByApiKey = middlewares?.header && globals.header;

    const [user_id, result, company] = (await Promise.all([
      tokenIsRequired ? requireToken(globals.token as string) : __resolve(),
      parameterIsRequired
        ? validateParameters(
            globals.id as string,
            globals.param as APIModelsKeys,
          )
        : __resolve(),
      searchCompanyByApiKey
        ? repository.findByField({
            model: "Company",
            field: "x-api-key",
            value: globals.header as string,
          })
        : __resolve(),
      mustValidateModel
        ? validateModel(
            globals.model as APIModelsKeys,
            globals.body as Record<string, unknown>,
          )
        : __resolve(),
    ])) as MiddlewarePromises;

    res.locals.user_id = user_id;
    res.locals.company = company;
    res.locals.result = result;

    return next();
  };
}

function __resolve(): Promise<unknown> {
  return new Promise((resolve) => resolve(null));
}
