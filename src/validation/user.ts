import Joi from "joi";

import { validation } from "../middlewares/validation";

const create = {
  name: Joi.string().min(5).required(),
  email: Joi.string().email().required(),
  username: Joi.string().min(5).required(),
  password: Joi.string().min(5).required(),
  description: Joi.string().allow(null, ""),
  state: Joi.boolean().required(),
};

const schemaCreate = Joi.object(create);

export const createValidation = validation(schemaCreate);

const groups = {
  groups: Joi.array().items(Joi.number()),
};

const schemaGroups = Joi.object(groups);

export const groupsValidation = validation(schemaGroups);

const update = {
  name: Joi.string().min(5).empty(""),
  email: Joi.string().email().empty(""),
  username: Joi.string().min(5).empty(""),
  password: Joi.string().min(5).empty(""),
  description: Joi.string().allow(null, ""),
  state: Joi.boolean().empty(""),
};

const schemaUpdate = Joi.object(update);

export const updateValidation = validation(schemaUpdate);
