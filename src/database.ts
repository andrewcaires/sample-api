import { forEachSeries } from "@andrewcaires/utils.js";
import { Group, GroupRoute, Route, User, UserGroup } from "./models";

export const setup = async () => {

  const users = await User.count();

  if (users == 0) {

    const user = await User.create({
      name: "Admin",
      email: "admin@localhost",
      username: "admin",
      password: "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
      description: "",
      state: true,
    });

    const groups = await Group.count();

    if (groups == 0) {

      const group = await Group.create({
        name: "admin",
        description: "",
        state: true,
      });

      await UserGroup.create({ userId: user.id, groupId: group.id });

      const permission = await Route.count();

      if (permission == 0) {

        const permissions = ["read", "write"];

        const models = ["users", "groups", "permission"];

        forEachSeries(models, async (model) => {

          forEachSeries(permissions, async (permission) => {

            const name = model.toLowerCase() + "." + permission.toLowerCase();

            const record = await Route.create({ name, description: "", state: true });

            await GroupRoute.create({ groupId: group.id, routeId: record.id });
          });
        });
      }
    }
  }
};
