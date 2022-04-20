import { DataTypes, Model } from "sequelize";

import { GroupRoute } from "./GroupRoute";

import { sequelize } from "../sequelize";

export class Route extends Model {

  public id!: number;
  public name!: string;
  public description!: string;
  public state!: boolean;
  public groups_routes!: GroupRoute[];
}

Route.init({

  name: DataTypes.STRING,
  description: DataTypes.TEXT,
  state: DataTypes.BOOLEAN,

}, {

  sequelize,
  modelName: "route",

});
