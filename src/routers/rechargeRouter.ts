import { Router } from 'express';
import { rechargeSchema } from '../schemas/rechargeSchema.js'
import * as rechargeController from '../controllers/rechargeController.js';
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import validationKeyMiddleware from "../middlewares/validationKeyMiddleware.js";

const rechargeRouter = Router();

rechargeRouter.put('/recharge/:cardId', validateSchemaMiddleware(rechargeSchema), validationKeyMiddleware, rechargeController.rechargeCard);

export default rechargeRouter;