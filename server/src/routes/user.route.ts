import { Router } from "express";

import * as middleware from "./../middlewares/user.middleware";
import * as controller from "./../controllers/user.controller";
import useMiddleware from "../utils/middleware.util";

const usersRouter = Router();
const endpoint = "/users";

const createEndpoint = "/create";
usersRouter.post(
  createEndpoint,
  useMiddleware({
    middlewares: { model: "User", header: "x-api-key" },
    endpoint: endpoint + createEndpoint,
  }),
  middleware.createOneValidations,
  controller.create,
);

/* const searchAllEndpoint = "/search";
usersRouter.get(
  searchAllEndpoint,
  useMiddleware({
    middlewares: { token: true, query: "User" },
    endpoint: endpoint + searchAllEndpoint,
  }),
  controller.searchAll,
); */

export default usersRouter;
