import { DataTypes, Model } from "sequelize";

import { User } from "./User";

import { sequelize } from "../sequelize";

export class Auth extends Model {

  public id!: number;
  public login!: number;
  public logout!: number;
  public secret!: string;
  public timestamp!: number;
  public useragent!: string;
  public user!: User;
}

Auth.init({

  login: DataTypes.BIGINT,
  logout: DataTypes.BIGINT,
  secret: DataTypes.STRING,
  timestamp: DataTypes.BIGINT,
  useragent: DataTypes.STRING,

}, {

  sequelize,
  modelName: "auth",

});
