import { Request, Response } from "express";
import * as companyService from '../services/companyService.js';

export async function getCompany(req: Request, res: Response){
    const apiKey = res.locals.apiKey;

    const existingCompany = await companyService.getCompanyIfExist(apiKey);

    res.status(200).send(existingCompany);
};