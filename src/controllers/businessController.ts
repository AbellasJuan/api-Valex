import { Request, Response } from "express";
import * as businessService from '../services/businessService.js';

export async function getBusiness(req: Request, res: Response){
    const { id } = req.params;
    const idTypeNumber = Number(id)  

    await businessService.getBusinessIfExist(idTypeNumber);
    res.sendStatus(200)
};