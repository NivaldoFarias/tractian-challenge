import { Router } from 'express';

import * as middleware from './../middlewares/user.middleware';
import * as controller from './../controllers/user.controller';
import useMiddleware from '../utils/middleware.util';

const usersRouter = Router();
const endpoint = '/users';

const createEndpoint = '/create';
usersRouter.post(
  createEndpoint,
  useMiddleware(
    { model: 'User', header: 'x-api-key' },
    endpoint + createEndpoint,
  ),
  middleware.apiKeyMatchesCompany,
  controller.create,
);

export default usersRouter;
