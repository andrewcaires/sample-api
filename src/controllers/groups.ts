import { Request, Response } from "express";

import { Group, GroupRoute, Route } from "../models";

import { Log } from "../helpers/Log";
import { Responses } from "../helpers/Responses";

import { Controller } from "../helpers/Controller";

const controller = new Controller("groups", Group);

export const add = controller.add();

export const all = controller.all();

export const del = controller.del();

export const get = controller.get();

export const routesAll = async (req: Request, res: Response) => {

  const { id } = req.params;

  const records = await GroupRoute.findAll({

    where: { groupId: id },

    include: [{

      model: Route,
      required: true,

    }],

  }).catch((error) => {

    Log.error(error.message, "groups.routesAll");
  });

  if (records) {

    return Responses.list(res, records.map((record) => record.route));
  }

  return Responses.error(res, "Internal Server Error");
};

export const routesSet = async (req: Request, res: Response) => {

  const { id } = req.params;
  const { routes } = req.body;

  const record = await Group.findByPk(id, {

    attributes: ["id"],

  }).catch((error) => {

    Log.error(error.message, "groups.routesSet");
  });

  if (record) {

    const groupId = record.id;

    await GroupRoute.destroy({ where: { groupId } });

    if (routes) {

      let count = 0;

      for (let i = 0; i < routes.length; i++) {

        count = await Route.count({ where: { id: routes[i] } });

        if (count) {

          await GroupRoute.create({ groupId, routeId: routes[i] });
        }
      }
    }

    return Responses.success(res, "OK");
  }

  if (record === null) {

    return Responses.notfound(res, "Record not found");
  }

  return Responses.error(res, "Internal Server Error");
};

export const set = controller.set();
