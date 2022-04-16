import { Request, Response, NextFunction } from "express";
import * as companyRepository from "../repositories/companyRepository.js";

export default async function validationKeyMiddleware(req: Request, res: Response, next: NextFunction) {
    
    const key = req.headers["x-api-key"] as string;
    const company = await companyRepository.findByApiKey(key);
    console.log(company)
    if (!company) throw {type: 'unauthorized', message:'company unauhorized to create card'}

    res.locals.companyId = company.id;

    next();
};