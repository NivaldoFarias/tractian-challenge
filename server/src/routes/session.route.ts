import { Router } from 'express';

import * as controller from '../controllers/session.controller';
import * as middleware from '../middlewares/session.middleware';

import useMiddleware from '../utils/middleware.util';

const authRouter = Router();
const endpoint = '/auth';

const signInEndpoint = '/sign-in';
authRouter.use(
  signInEndpoint,
  useMiddleware({ model: 'Session' }, endpoint + signInEndpoint),
  middleware.signInValidations,
  controller.signIn,
);

export default authRouter;
