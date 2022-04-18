import {Router} from 'express';
import businessRouter from './businessRouter.js';
import cardRouter from './cardRouter.js';
import companyRouter from './companyRouter.js';
import employeeRouter from './employeeRouter.js';
import rechargeRouter from './rechargeRouter.js';
import transactionRouter from './transactionRouter.js';

const router = Router();
router.use(employeeRouter);
router.use(companyRouter);
router.use(businessRouter);
router.use(cardRouter);
router.use(rechargeRouter);
router.use(transactionRouter);

export default router;