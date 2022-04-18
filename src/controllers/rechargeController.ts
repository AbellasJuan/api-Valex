import { Response, Request } from 'express';
import * as rechargeServices from '../services/rechargeService.js';

export async function rechargeCard(req: Request, res: Response) {
    const { amount } = req.body;
    const { cardId } = req.params;
    const idTypeNumber = Number(cardId);

    await rechargeServices.rechargeCard(idTypeNumber, amount)
    res.sendStatus(200);
};