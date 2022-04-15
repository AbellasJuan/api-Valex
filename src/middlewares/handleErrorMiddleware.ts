import { NextFunction, Request, Response } from "express";

export function handleErrorMiddleware(error, req:Request, res: Response, next: NextFunction){
    if(error.type === 'not_found') return res.status(404).send(error.message);
    
    res.sendStatus(500);
};