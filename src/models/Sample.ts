import { sequelize } from "@andrewcaires/api";
import { DataTypes, Model } from "sequelize";

export class Sample extends Model {

  public id!: number;
  public name!: string;
}

Sample.init({

  name: DataTypes.STRING,

}, {

  sequelize,
  modelName: "sample",

});
