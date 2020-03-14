import * as Joi from "@hapi/joi"


export const emailSchema = Joi.string().email().required();

export const passwordSchema = Joi.string().min(6).max(20).required();