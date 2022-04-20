import { Model } from "sequelize";

import { User } from "./User";
import { Group } from "./Group";

import { sequelize } from "../sequelize";

export class UserGroup extends Model {

  public userId!: number;
  public groupId!: number;
  public user!: User;
  public group!: Group;
}

UserGroup.init({}, {

  sequelize,
  modelName: "users_groups",

});

UserGroup.removeAttribute("id");
