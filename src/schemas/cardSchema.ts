import joi from 'joi';

const cardSchema = joi.object({
    name: joi.string().required(),
    type: joi.string().valid(
        'groceries', 
        'restaurant', 
        'transport', 
        'education', 
        'health'
    ).required()
})