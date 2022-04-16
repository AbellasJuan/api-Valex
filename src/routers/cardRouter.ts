import { Router } from "express";
import * as cardController from '../controllers/cardController.js'
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import { cardSchema } from "../schemas/cardSchema.js";
import validationKeyMiddleware from "../middlewares/validationKeyMiddleware.js";
import { activationCardSchema } from "../schemas/activationCardSchema.js";

const cardRouter = Router();

cardRouter.get('/cards', cardController.getAllCards);
cardRouter.get('/cards/:id', cardController.getCardByCardId);
cardRouter.post('/card', validateSchemaMiddleware(cardSchema), validationKeyMiddleware, cardController.postCard);
cardRouter.delete('/card/:id', validationKeyMiddleware, cardController.deleteCardById);
cardRouter.put('/validate-card', validateSchemaMiddleware(activationCardSchema), validationKeyMiddleware, cardController.validateCard);
export default cardRouter;