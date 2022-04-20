import { DataTypes, Model } from "sequelize";

import { sequelize } from "../sequelize";

export class Logs extends Model {

  public type!: string;
  public source!: string;
  public message!: string;
}

Logs.init({

  type: DataTypes.STRING,
  source: DataTypes.STRING,
  message: DataTypes.TEXT,

}, {

  sequelize,
  modelName: "logs",
  timestamps: true,
  createdAt: "created",
  updatedAt: false,

});
