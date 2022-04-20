import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

import { Responses } from "../helpers/Responses";

interface CustomError {
  key: string;
  type: string;
}

export const validation = (schema: ObjectSchema) => {

  const options = { abortEarly: false, allowUnknown: true, stripUnknown: true };

  return (req: Request, res: Response, next: NextFunction) => {

    const { error, value } = schema.validate(req.body, options);

    if (error) {

      const message = error.details.map((detail) => detail.message).join(", ");

      const errors: CustomError[] = [];

      error.details.forEach((detail) => {

        errors.push({ key: detail.context?.key || "", type: detail.type });
      });

      return Responses.validation(res, "Validation error: " + message, errors);
    }

    req.body = value;

    return next();
  };
};
