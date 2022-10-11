import { Router } from "express";

import * as controller from "./../controllers/asset.controller";
import * as middleware from "../middlewares/asset.middleware";

import useMiddleware from "../utils/middleware.util";

const assetsRouter = Router();
const endpoint = "/assets";

const createEndpoint = "/create";
assetsRouter.post(
  createEndpoint,
  useMiddleware({
    middlewares: {
      token: true,
      model: "Asset",
      header: "x-api-key",
      search: "unit_id",
    },
    endpoint: endpoint + createEndpoint,
  }),
  middleware.createOneValidations,
  controller.create,
);

const searchAllEndpoint = "/search";
assetsRouter.get(
  searchAllEndpoint,
  useMiddleware({
    middlewares: { token: true, query: "Asset" },
    endpoint: endpoint + searchAllEndpoint,
  }),
  controller.searchAll,
);

const searchByIdEndpoint = "/search/:id";
assetsRouter.get(
  searchByIdEndpoint,
  useMiddleware({
    middlewares: { token: true, param: "Asset" },
    endpoint: endpoint + searchByIdEndpoint,
  }),
  controller.searchById,
);

const updateEndpoint = "/update/:id";
assetsRouter.put(
  updateEndpoint,
  useMiddleware({
    middlewares: {
      token: true,
      model: "Asset",
      header: "x-api-key",
      param: "Asset",
    },
    endpoint: endpoint + updateEndpoint,
  }),
  middleware.updateOrDeleteOneValidations,
  controller.update,
);

const deleteEndpoint = "/delete/:id";
assetsRouter.delete(
  deleteEndpoint,
  useMiddleware({
    middlewares: {
      token: true,
      header: "x-api-key",
      param: "Asset",
    },
    endpoint: endpoint + deleteEndpoint,
  }),
  middleware.updateOrDeleteOneValidations,
  controller.deleteOne,
);

export default assetsRouter;
