import express from 'express';

import authRouter from './session.route';
import companiesRouter from './company.route';
import usersRouter from './user.route';

const router = express.Router();

router.use('/companies', companiesRouter);
router.use('/users', usersRouter);
router.use('/auth', authRouter);

export default router;
