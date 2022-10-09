import type { Request, Response, NextFunction } from "express";
import type { APIModelsKeys, QueriesGeneric } from "../types/collection";
import type UseMiddleware from "../types/middleware";

import AppError from "../config/error";
import AppLog from "../events/AppLog";

import processHeader from "./../middlewares/header.middleware";
import requireToken from "./../middlewares/token.middleware";
import validateModel from "../middlewares/model.middleware";
import parseQueries from "../middlewares/query.middleware";

function useMiddleware({
  middlewares,
  endpoint,
}: {
  middlewares?: UseMiddleware;
  endpoint: string;
}) {
  return async (req: Request, res: Response, next: NextFunction) => {
    AppLog({ type: "Server", text: `Routing ...${endpoint}` });

    if (middlewares?.model) {
      await validateModel(middlewares.model, req.body);
      res.locals.body = req.body;
    }

    if (middlewares?.header) {
      processHeader(req.header(middlewares.header));
      res.locals.header = req.header(middlewares.header);
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

      const parsedToken = __parseToken(token);
      res.locals.token = parsedToken;
      res.locals.user_id = await requireToken(parsedToken);
    }

    if (middlewares?.queries?.length) {
      const queries: QueriesGeneric = req.query as QueriesGeneric;
      const parsedQueries = parseQueries(queries, middlewares.queries);

      res.locals.query = parsedQueries;
    }

    if (middlewares?.param) {
      const param = req.params[middlewares.param];
      const notObjectId = typeof param !== "string" || param.length !== 24;
      if (notObjectId) {
        throw new AppError({
          statusCode: 400,
          message: "Invalid Syntax",
          detail: "Ensure to provide the a valid ObjectId",
        });
      }

      res.locals.param = param;
    }

    return next();
  };

  function __parseToken(header: string) {
    return header.replace("Bearer ", "").trim() ?? null;
  }
}

export function entityExists(
  entity: APIModelsKeys | null,
  model: APIModelsKeys,
) {
  if (!entity) {
    throw new AppError({
      statusCode: 404,
      message: `${model} not found`,
      detail: "Ensure to provide a valid ID",
    });
  }

  AppLog({ type: "Middleware", text: `${model} found` });
}

export default useMiddleware;
