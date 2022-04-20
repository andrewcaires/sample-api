import { Model } from "sequelize";

import { Group } from "./Group";
import { Route } from "./Route";

import { sequelize } from "../sequelize";

export class GroupRoute extends Model {

  public groupId!: number;
  public routeId!: number;
  public group!: Group;
  public route!: Route;
}

GroupRoute.init({}, {

  sequelize,
  modelName: "groups_routes",

});

GroupRoute.removeAttribute("id");
