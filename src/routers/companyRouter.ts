import { Router } from "express";
import * as companyController from '../controllers/companyController.js'

const companyRouter = Router();

companyRouter.get('/company', companyController.getCompany)

export default companyRouter;