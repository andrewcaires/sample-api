import { NextFunction, Request, Response } from "express";

import { Permission } from "../helpers/Permission";
import { Responses } from "../helpers/Responses";

export const permission = (name: string) => {

  return async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user;

    if (!user) {

      return Responses.unauthorized(res, "Access denied");
    }

    if (await Permission.is(user, name)) {

      return next();
    }

    return Responses.error(res, "Unauthorized access");
  };
};
