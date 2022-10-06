import { Router } from 'express';

const companies = Router();
const endpoint = '/companies';

const createEndpoint = '/create';
companies.post(createEndpoint, controller.create);
