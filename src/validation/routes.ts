import Joi from "joi";

import { validation } from "../middlewares/validation";

const create = {
  name: Joi.string().min(5).required(),
  permission: Joi.string().required(),
  description: Joi.string().allow(null, ""),
  state: Joi.boolean().required(),
};

const schemaCreate = Joi.object(create);

export const createValidation = validation(schemaCreate);

const update = {
  name: Joi.string().min(5).empty(""),
  permission: Joi.string().empty(""),
  description: Joi.string().allow(null, ""),
  state: Joi.boolean().empty(""),
};

const schemaUpdate = Joi.object(update);

export const updateValidation = validation(schemaUpdate);
