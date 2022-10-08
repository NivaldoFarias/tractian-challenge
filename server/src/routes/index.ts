import express from 'express';

//import authRouter from './auth.route';
import companiesRouter from './company.route';
import usersRouter from './user.route';

const router = express.Router();

//router.use('/auth', authRouter);
router.use('/companies', companiesRouter);
router.use('/users', usersRouter);

export default router;
