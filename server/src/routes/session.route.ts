import { Router } from "express";

import * as controller from "../controllers/session.controller";
import * as middleware from "../middlewares/session.middleware";

import useMiddleware from "../utils/middleware.util";

const sessionRouter = Router();
const endpoint = "/auth";

const signInEndpoint = "/sign-in";
sessionRouter.use(
  signInEndpoint,
  useMiddleware({
    middlewares: { model: "Session" },
    endpoint: endpoint + signInEndpoint,
  }),
  middleware.signInValidations,
  controller.signIn,
);

const signOutEndpoint = "/sign-out";
sessionRouter.use(
  signOutEndpoint,
  useMiddleware({
    middlewares: { token: true },
    endpoint: endpoint + signOutEndpoint,
  }),
  middleware.signOutValidations,
  controller.signOut,
);

export default sessionRouter;
