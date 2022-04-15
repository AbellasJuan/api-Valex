import {Router} from 'express';
import businessRouter from './businessRouter.js';
import companyRouter from './companyRouter.js';
import employeeRouter from './employeeRouter.js';

const router = Router();
router.use(employeeRouter);
router.use(companyRouter);
router.use(businessRouter)

export default router;