import * as controller from './../controllers/company.controller';
import { Router } from 'express';

const companiesRouter = Router();
//const endpoint = '/companies';

const createEndpoint = '/create';
companiesRouter.post(createEndpoint, controller.create);

export default companiesRouter;
