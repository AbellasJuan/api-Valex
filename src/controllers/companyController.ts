import { Request, Response } from "express";
import * as companyService from '../services/companyService.js';

export async function getCompany(req: Request, res: Response){

    const { key } = req.headers;
    const keyTypeString = String(key)  

    const existingCompany = await companyService.getCompanyIfExist(keyTypeString);

    console.log('existingCompany',existingCompany);
    res.sendStatus(200)
}