import { Router } from 'express';
import * as transactionController from '../controllers/transactionController.js';
import validateSchemaMiddleware from '../middlewares/validateSchemaMiddleware.js';
import { transactionSchema } from '../schemas/transactionSchema.js';

const transactionRouter = Router();

transactionRouter.put('/transaction/:cardId', validateSchemaMiddleware(transactionSchema), transactionController.createTransaction)

export default transactionRouter;