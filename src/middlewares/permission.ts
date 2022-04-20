import { NextFunction, Request, Response } from "express";

import { Log } from "../helpers/Log";
import { Responses } from "../helpers/Responses";

import { Group, GroupRoute, Route, UserGroup } from "../models";

export const permission = (name: string) => {

  return async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user;

    if (!user) {

      return Responses.unauthorized(res, "Access denied");
    }

    const records = await Route.findAll({

      where: { name, state: true },

      include: [{

        model: GroupRoute,
        required: true,

        include: [{

          model: Group,
          required: true,
          where: { state: true },

          include: [{

            model: UserGroup,
            required: true,
            where: { userId: user.id },

          }],

        }],

      }],

    }).catch((error) => {

      Log.error(error.message, "permission");
    });

    if (records && records.length) {

      return next();
    }

    return Responses.error(res, "Unauthorized access");
  };
};
