import { SHA256 } from "crypto-js";
import { Request, Response } from "express";

import { Group, User, UserGroup } from "../models";

import { Controller } from "../helpers/Controller";
import { Log } from "../helpers/Log";
import { Responses } from "../helpers/Responses";

const controller = new Controller("user", User);
const controller2 = new Controller("user.groups", UserGroup);

const attributes = ["id", "name", "email", "username", "description", "state"];

export const add = async (req: Request, res: Response) => {

  req.body.password = SHA256(req.body.password).toString();

  return await controller.add()(req, res);
};

export const all = async (req: Request, res: Response) => {

  return controller.all({ attributes })(req, res);
};

export const del = controller.del();

export const get = async (req: Request, res: Response) => {

  return controller.get({ attributes })(req, res);
};

export const groupsAll = async (req: Request, res: Response) => {

  const { id } = req.params;

  return controller2.all({

    where: { userId: id },

    include: [{

      model: Group,
      required: true,

    }],

  }, (records) => {

    return records.map((record) => record.group);

  })(req, res);
};

export const groupsSet = async (req: Request, res: Response) => {

  const { id } = req.params;
  const { groups } = req.body;

  const record = await User.findByPk(id, {

    attributes: ["id"],

  }).catch((error) => {

    Log.error(error.message, "user.groups.set");
  });

  if (record) {

    await UserGroup.destroy({ where: { userId: record.id } });

    if (groups) {

      let count = 0;

      for (let i = 0; i < groups.length; i++) {

        count = await Group.count({ where: { id: groups[i] } });

        if (count) {

          await UserGroup.create({ userId: record.id, groupId: groups[i] });
        }
      }
    }

    return Responses.success(res, "OK");
  }

  return Responses.notfound(res, "Record not found");
};

export const set = async (req: Request, res: Response) => {

  if (req.body.password) {

    req.body.password = SHA256(req.body.password).toString();
  }

  return controller.set()(req, res);
};
