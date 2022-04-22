import Joi from "joi";

import { validation } from "../middlewares/validation";

const query = {
  username: Joi.string().min(5).required(),
  password: Joi.string().min(5).required(),
};

const schemaQuery = Joi.object(query);

export const queryValidation = validation(schemaQuery);
