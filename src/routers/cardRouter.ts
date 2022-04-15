import { Router } from "express";
import * as cardController from '../controllers/cardController.js'

const cardRouter = Router();

cardRouter.get('/cards', cardController.getAllCards);
cardRouter.get('/cards/:id', cardController.getCardByCardId);

export default cardRouter;