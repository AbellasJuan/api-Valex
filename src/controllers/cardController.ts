import { Request, Response } from "express";
import * as cardService from '../services/cardService.js';

export async function getAllCards(req: Request, res: Response){
    const existingCard = await cardService.getAllCardsIfExist();

    console.log('existingCard', existingCard);
    res.sendStatus(200)
};

export async function getCardByCardId(req: Request, res: Response){
    const { id } = req.params;
    const idTypeNumber = Number(id);

    const existingCard = await cardService.getCardByCardIdIfExist(idTypeNumber);

    console.log('existingCardById', existingCard);
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

// export async function updateCard(req: Request, res: Response){
//     const { id } = req.params;
//     const idTypeNumber = Number(id);

//     console.log('entrou update:', id)

//     await cardService.updateCard(idTypeNumber);

//     res.sendStatus(200)
// };