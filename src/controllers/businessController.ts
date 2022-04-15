import { Request, Response } from "express";
import * as businessService from '../services/businessService.js';

export async function getBusiness(req: Request, res: Response){

    const { id } = req.params;
    const idTypeNumber = Number(id)  

    const existingBusiness = await businessService.getBusinessIfExist(idTypeNumber);

    console.log('existingBusiness', existingBusiness);
    res.sendStatus(200)
}