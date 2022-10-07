import express from 'express';

//import authRouter from './auth.route';
import companiesRouter from './company.route';

const router = express.Router();

//router.use('/auth', authRouter);
router.use('/companies', companiesRouter);

export default router;
