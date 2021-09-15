import Joi from 'joi';

import { validation } from '../middlewares/validation';

const update = {
    name: Joi.string().min(5).empty(''),
    email: Joi.string().email().empty(''),
    username: Joi.string().alphanum().min(3).empty(''),
    password: Joi.string().min(6).empty(''),
    state: Joi.boolean().empty(true)
};

const schemaUpdate = Joi.object(update);

export const updateValidation = validation(schemaUpdate);

const create = {
    name: Joi.string().min(5).required(),
    email: Joi.string().email().required(),
    username: Joi.string().alphanum().min(3).required(),
    password: Joi.string().min(6).required(),
    state: Joi.boolean().required()
};

const schemaCreate = Joi.object(create);

export const createValidation = validation(schemaCreate);
