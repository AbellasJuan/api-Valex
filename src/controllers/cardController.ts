import { Request, Response } from "express";
import * as cardService from '../services/cardService.js';

export async function getAllCards(req: Request, res: Response){
    const existingCard = await cardService.getAllCardsIfExist();

    res.status(200).send(existingCard);
};

export async function getCardByCardId(req: Request, res: Response){
    const { id } = req.params;
    const idTypeNumber = Number(id);

    await cardService.getCardByCardIdIfExist(idTypeNumber);

    res.sendStatus(200)
};

export async function postCard(req: Request, res: Response){
    const { companyId } = res.locals;
    const { employeeId, type } = req.body;

    await cardService.validateCreation(employeeId, companyId, type);
    await cardService.createCard(employeeId, type);

    res.sendStatus(201);
};

export async function deleteCardById(req: Request, res: Response){
    const { id } = req.params;
    const idTypeNumber = Number(id);

    await cardService.deleteCardById(idTypeNumber);

    res.sendStatus(200);
}

export async function validateCard(req: Request, res: Response){
    const { securityCode, password, originalCardId } = req.body;

    await cardService.activateCard(securityCode, password, originalCardId);

    res.sendStatus(200);
};

export async function getCardBalanceAndTransactions(req: Request, res: Response) {
    const { id } = req.params;
    const idTypeNumber = Number(id);

    const balanceAndTransactions = await cardService.getBalanceAndTransactions(idTypeNumber)

    res.send(balanceAndTransactions).status(200);
};