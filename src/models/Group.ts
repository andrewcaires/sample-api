import { DataTypes, Model } from "sequelize";

import { GroupRoute } from "./GroupRoute";
import { UserGroup } from "./UserGroup";

import { sequelize } from "../sequelize";

export class Group extends Model {

  public id!: number;
  public name!: string;
  public description!: string;
  public state!: boolean;
  public groups_routes!: GroupRoute[];
  public users_groups!: UserGroup[];
}

Group.init({

  name: DataTypes.STRING,
  description: DataTypes.TEXT,
  state: DataTypes.BOOLEAN,

}, {

  sequelize,
  modelName: "group",

});
