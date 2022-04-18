import joi from 'joi';

export const transactionSchema = joi.object({
    password: joi.string().required(),
    businessId: joi.number().required(),
    amount: joi.number().min(1).required()
});