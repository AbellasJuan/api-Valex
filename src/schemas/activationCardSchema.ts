import joi from 'joi';

export const activationCardSchema = joi.object({   
        securityCode: joi.string().length(3).required(),
        password: joi.string().length(4).required(),
        originalCardId: joi.number().required()
});