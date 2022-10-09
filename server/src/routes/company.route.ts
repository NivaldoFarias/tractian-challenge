import { Router } from 'express';

import * as controller from './../controllers/company.controller';
import useMiddleware from '../utils/middleware.util';

const companiesRouter = Router();
const endpoint = '/companies';

const createEndpoint = '/create';
companiesRouter.post(
  createEndpoint,
  useMiddleware({
    middlewares: { model: 'Company', header: 'x-api-key' },
    endpoint: endpoint + createEndpoint,
  }),
  controller.create,
);

export default companiesRouter;
