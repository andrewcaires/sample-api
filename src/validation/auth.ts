import Joi from 'joi';

import { validation } from '../middlewares/validation';

const query = {
    username: Joi.string().alphanum().min(3).required(),
    password: Joi.string().min(6).required()
};

const schemaQuery = Joi.object(query);

export const queryValidation = validation(schemaQuery);
