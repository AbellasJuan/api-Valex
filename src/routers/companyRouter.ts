import { Router } from "express";
import * as companyController from '../controllers/companyController.js'
import validationKeyMiddleware from "../middlewares/validationKeyMiddleware.js";

const companyRouter = Router();

companyRouter.get('/company', validationKeyMiddleware, companyController.getCompany);

export default companyRouter;