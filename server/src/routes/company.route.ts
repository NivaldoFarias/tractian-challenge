import { Router } from "express";

import * as controller from "./../controllers/company.controller";
import useMiddleware from "../utils/middleware.util";
import { conditionals } from "../utils/constants.util";

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

export default companiesRouter;
