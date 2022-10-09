import { Router } from "express";

import * as controller from "./../controllers/company.controller";

import { conditionals } from "../utils/constants.util";
import useMiddleware from "../utils/middleware.util";
import { apiKeyMatchesCompanyName } from "../middlewares/company.middleware";

const companiesRouter = Router();
const endpoint = "/companies";

const createEndpoint = "/create";
companiesRouter.post(
  createEndpoint,
  useMiddleware({
    middlewares: { model: "Company", header: "x-api-key" },
    endpoint: endpoint + createEndpoint,
  }),
  controller.create,
);

const searchAllEndpoint = "/search";
companiesRouter.get(
  searchAllEndpoint,
  useMiddleware({
    middlewares: { token: true, queries: conditionals.COMPANY_QUERIES },
    endpoint: endpoint + searchAllEndpoint,
  }),
  controller.searchAll,
);

const searchByIdEndpoint = "/search/:id";
companiesRouter.get(
  searchByIdEndpoint,
  useMiddleware({
    middlewares: { token: true, param: conditionals.COMPANY_PARAM },
    endpoint: endpoint + searchByIdEndpoint,
  }),
  controller.searchById,
);

const updateEndpoint = "/update/:id";
companiesRouter.put(
  updateEndpoint,
  useMiddleware({
    middlewares: {
      token: true,
      model: "Company",
      header: "x-api-key",
      param: conditionals.COMPANY_PARAM,
    },
    endpoint: endpoint + updateEndpoint,
  }),
  apiKeyMatchesCompanyName,
  controller.update,
);

export default companiesRouter;
