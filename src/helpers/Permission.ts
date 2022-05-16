import { WhereOptions } from "sequelize/types";

import { Group, GroupRoute, Route, UserGroup, User } from "../models";
import { Log } from "./Log";

export class Permission {

  static async all(user: User, where?: WhereOptions) {

    return await Route.findAll({

      where: { ...where, state: true },

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
  }

  static async get(user: User) {

    const records = await Permission.all(user);

    return records ? records.map((record) => record.name) : [];
  }

  static async is(user: User, name: string) {

    const records = await Permission.all(user, { name });

    return records && !!records.length;
  }
}
