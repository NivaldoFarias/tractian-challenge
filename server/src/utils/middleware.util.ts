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

    if (middlewares?.param || middlewares?.search) {
      globals.id = middlewares?.search
        ? req.body[middlewares.search]
        : req.params.id;

      if (middlewares?.param && !middlewares?.search) {
        res.locals.param = globals.id;
      }
    }

    const [user_id, result, company] = (await Promise.all([
      __tokenIsRequired(),
      __parameterIsRequired(),
      __searchCompanyByApiKey(),
      __validateModel(),
    ])) as MiddlewarePromises;

    res.locals.user_id = user_id;
    res.locals.result = result;
    res.locals.company = company;

    return next();

    function __parameterIsRequired() {
      return (middlewares?.param || middlewares?.search) && globals.id
        ? validateParameters(
            globals.id as string,
            (globals.param as APIModelsKeys) ?? "Unit",
          )
        : __resolve();
    }

    function __tokenIsRequired() {
      return middlewares?.token && globals.token
        ? requireToken(globals.token as string)
        : __resolve();
    }

    function __searchCompanyByApiKey() {
      return middlewares?.header && globals.header
        ? repository.findByField({
            model: "Company",
            field: "x-api-key",
            value: globals.header as string,
          })
        : __resolve();
    }

    function __validateModel() {
      return middlewares?.model && globals.body && globals.model
        ? validateModel(
            globals.model as APIModelsKeys,
            globals.body as Record<string, unknown>,
          )
        : __resolve();
    }
  };
}

function __resolve(): Promise<unknown> {
  return new Promise((resolve) => resolve(null));
}
