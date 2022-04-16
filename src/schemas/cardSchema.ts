import joi from 'joi';

export const cardSchema = joi.object({   
        employeeId: joi.number().required(),
        type: joi.string().valid(
            'groceries', 
            'restaurant', 
            'transport', 
            'education', 
            'health'
        ).required()
});