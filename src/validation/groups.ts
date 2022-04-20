import Joi from "joi";

import { validation } from "../middlewares/validation";

const create = {
  name: Joi.string().min(3).required(),
  description: Joi.string().allow(null, ""),
  state: Joi.boolean().required(),
};

const schemaCreate = Joi.object(create);

export const createValidation = validation(schemaCreate);

const routes = {
  routes: Joi.array().items(Joi.number()),
};

const schemaRoutes = Joi.object(routes);

export const routesValidation = validation(schemaRoutes);

const update = {
  name: Joi.string().min(3).empty(""),
  description: Joi.string().allow(null, ""),
  state: Joi.boolean().empty(""),
};

const schemaUpdate = Joi.object(update);

export const updateValidation = validation(schemaUpdate);
