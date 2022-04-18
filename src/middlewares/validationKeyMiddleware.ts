import { Request, Response, NextFunction } from "express";
import * as companyRepository from "../repositories/companyRepository.js";

export default async function validationKeyMiddleware(req: Request, res: Response, next: NextFunction) {
    
    const apiKey = req.headers["x-api-key"] as string;
    const company = await companyRepository.findByApiKey(apiKey);
    if (!company) throw {type: 'unauthorized', message:'company unauhorized to create card'}

    res.locals.companyId = company.id;
    res.locals.apiKey = apiKey;
    next();
};