import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { Auth, User } from "../models";

import { Log } from "../helpers/Log";
import { Responses } from "../helpers/Responses";

import { API_TOKEN_HEADER, API_TOKEN_LIFETIME } from "../config";
import { crt } from "../ssl";

declare global {
  namespace Express {
    interface Request {
      auth: Auth | undefined;
      user: User | undefined;
    }
  }
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {

  const token = req.get(API_TOKEN_HEADER) || "";

  if (!crt.token) {

    return Responses.error(res, "Invalid Secret");
  }

  if (!token || token.split(".").length < 3) {

    return Responses.error(res, "Invalid token");
  }

  const decode: any = jwt.verify(token, crt.token);

  if (decode && decode.id && decode.secret) {

    const user = await User.findOne({

      where: { id: decode.id },

    }).catch((error) => {

      Log.error(error.message, "token.check");
    });

    if (user && user.state) {

      const auth = await Auth.findOne({

        where: { logout: null, secret: decode.secret, userId: user.id },

      }).catch((error) => {

        Log.error(error.message, "token.check");
      });

      if (auth) {

        const time = Date.now();

        if (time > auth.timestamp) {

          return Responses.error(res, "Expired token");
        }

        auth.timestamp = time + (API_TOKEN_LIFETIME * 60000);

        const useragent = req.get("User-Agent");

        if (useragent) {

          auth.useragent = useragent;
        }

        await auth.save();

        req.auth = auth;
        req.user = user;

        return next();
      }
    }

    return Responses.error(res, "Access denied");
  }

  return Responses.error(res, "Invalid token");
};
