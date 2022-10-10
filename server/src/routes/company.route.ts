import { Router } from "express";

import * as controller from "./../controllers/company.controller";
import { updateOrDeleteOneValidations } from "../middlewares/company.middleware";

import useMiddleware from "../utils/middleware.util";

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
    middlewares: { token: true, query: "Company" },
    endpoint: endpoint + searchAllEndpoint,
  }),
  controller.searchAll,
);

const searchByIdEndpoint = "/search/:id";
companiesRouter.get(
  searchByIdEndpoint,
  useMiddleware({
    middlewares: { token: true, param: "Company" },
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
      param: "Company",
    },
    endpoint: endpoint + updateEndpoint,
  }),
  updateOrDeleteOneValidations,
  controller.update,
);

const deleteEndpoint = "/delete/:id";
companiesRouter.delete(
  deleteEndpoint,
  useMiddleware({
    middlewares: {
      token: true,
      header: "x-api-key",
      param: "Company",
    },
    endpoint: endpoint + deleteEndpoint,
  }),
  updateOrDeleteOneValidations,
  controller.deleteOne,
);

export default companiesRouter;
