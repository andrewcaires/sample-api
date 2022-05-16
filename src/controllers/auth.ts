import { allowedObject, uniqueID, sleep } from "@andrewcaires/utils.js";
import { SHA256 } from "crypto-js";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

import { Auth, User } from "../models";

import { Log } from "../helpers/Log";
import { Responses } from "../helpers/Responses";

import { API_AUTH_SLEEP, API_TOKEN_LIFETIME } from "../config";
import { key } from "../ssl";
import { Permission } from "../helpers/Permission";

const attributes = ["id", "name", "email", "username"];

export const login = async (req: Request, res: Response) => {

  const { username, password } = req.body;

  if (!username || !password) {

    return Responses.error(res, "Invalid parameters");
  }

  await sleep(API_AUTH_SLEEP);

  const user = await User.findOne({

    where: { username },

  }).catch((error) => {

    Log.error(error.message, "auth.login");
  });

  if (!user) {

    return Responses.notfound(res, "User not found");
  }

  if (!user.state) {

    return Responses.error(res, "User is disabled");
  }

  const hash = SHA256(password).toString();

  if (user.password != hash) {

    return Responses.error(res, "Invalid password");
  }

  if (!key.token) {

    return Responses.error(res, "Invalid Secret");
  }

  const id = user.id;
  const secret = uniqueID();

  const token = jwt.sign({ id, secret }, key.token, { algorithm: "RS256" });

  if (token) {

    const login = Date.now();
    const timestamp = login + (API_TOKEN_LIFETIME * 60000);

    const useragent = req.get("User-Agent");

    const auth = await Auth.create({

      login, secret, timestamp, useragent, userId: id,

    }).catch((error) => {

      Log.error(error.message, "auth.login");
    });

    if (auth) {

      return Responses.data(res, { token });
    }
  }

  return Responses.error(res, "Internal Server Error");
};

export const logout = async (req: Request, res: Response) => {

  const auth = req.auth;

  if (!auth) {

    return Responses.unauthorized(res, "Access denied");
  }

  auth.logout = Date.now();
  auth.timestamp = auth.logout;

  await auth.save();

  return Responses.success(res, "Disconcerted");
};

export const user = async (req: Request, res: Response) => {

  const user = req.user;

  if (!user) {

    return Responses.unauthorized(res, "Access denied");
  }

  const records = await Permission.all(user);

  if (records) {

    const filter = allowedObject(attributes, user.toJSON());
    const permissions = records.map((record) => record.name);

    return Responses.data(res, { ...filter, permissions });
  }

  return Responses.error(res, "Internal Server Error");
};
