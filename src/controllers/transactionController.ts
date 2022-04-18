import { Request, Response } from 'express';
import * as transactionService from '../services/transactionService.js';

export async function createTransaction(req: Request, res: Response) {
    const { cardId } = req.params;
    const cardIdTypeNumber = Number(cardId);

    const { password, businessId, amount } = req.body;

    await transactionService.purchase(cardIdTypeNumber, password, businessId, amount);

    res.sendStatus(200);
};