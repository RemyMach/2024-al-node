import Joi from "joi";

export const productValidation = Joi.object({
    name: Joi.string()
        .min(3)
        .required(),
    price: Joi.number()
        .required(),
}).options({abortEarly: false})
