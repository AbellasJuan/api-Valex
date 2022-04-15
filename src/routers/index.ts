import {Router} from 'express';
import companyRouter from './companyRouter.js';
import employeeRouter from './employeeRouter.js';

const router = Router();
router.use(employeeRouter);
router.use(companyRouter);

export default router;