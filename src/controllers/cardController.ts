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

    console.log('existingCard', existingCard);
    res.sendStatus(200)
};