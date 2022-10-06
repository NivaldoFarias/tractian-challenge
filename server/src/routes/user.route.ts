import { Router } from 'express';

const userRouter = Router();
const endpoint = '/users';

const createEndpoint = '/create';
userRouter.post(createEndpoint, controller.create);
