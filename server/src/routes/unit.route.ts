import { Router } from "express";

import * as controller from "./../controllers/unit.controller";
import * as middleware from "../middlewares/unit.middleware";

import useMiddleware from "../utils/middleware.util";

const unitsRouter = Router();
const endpoint = "/units";

const createEndpoint = "/create";
unitsRouter.post(
  createEndpoint,
  useMiddleware({
    middlewares: { token: true, model: "Unit", header: "x-api-key" },
    endpoint: endpoint + createEndpoint,
  }),
  middleware.createOneValidations,
  controller.create,
);

const searchAllEndpoint = "/search";
unitsRouter.get(
  searchAllEndpoint,
  useMiddleware({
    middlewares: { token: true, query: "Unit" },
    endpoint: endpoint + searchAllEndpoint,
  }),
  controller.searchAll,
);

const searchByIdEndpoint = "/search/:id";
unitsRouter.get(
  searchByIdEndpoint,
  useMiddleware({
    middlewares: { token: true, param: "Unit" },
    endpoint: endpoint + searchByIdEndpoint,
  }),
  controller.searchById,
);

const updateEndpoint = "/update/:id";
unitsRouter.put(
  updateEndpoint,
  useMiddleware({
    middlewares: {
      token: true,
      model: "Unit",
      header: "x-api-key",
      param: "Unit",
    },
    endpoint: endpoint + updateEndpoint,
  }),
  middleware.updateOrDeleteOneValidations,
  controller.update,
);

const deleteEndpoint = "/delete/:id";
unitsRouter.delete(
  deleteEndpoint,
  useMiddleware({
    middlewares: {
      token: true,
      header: "x-api-key",
      param: "Unit",
    },
    endpoint: endpoint + deleteEndpoint,
  }),
  middleware.updateOrDeleteOneValidations,
  controller.deleteOne,
);

export default unitsRouter;
