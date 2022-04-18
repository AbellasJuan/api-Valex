import { NextFunction, Request, Response } from "express";

export default function validateSchemaMiddleware(schema: any) {
    return function (req: Request, res: Response, next: NextFunction){
        const validation = schema.validate(req.body);

        if (validation.error) {
            return res.status(422).send(validation.error.details.map(obj => (obj.message)));
        };

        next();
    }
};