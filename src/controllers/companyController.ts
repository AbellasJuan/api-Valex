import { Request, Response } from "express";
import * as companyService from '../services/companyService.js';

export async function getCompany(req: Request, res: Response){

    const apiKey = req.headers.apikey;
    const stringApiKey = String(apiKey)

    const response = await companyService.getCompanyIfExist(stringApiKey);

    console.log('response',response);
    res.sendStatus(200)
}