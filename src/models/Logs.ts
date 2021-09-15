import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../bin/sequelize';

export class Logs extends Model {

    public type!: string;
    public message!: string;
}

Logs.init({

    type: DataTypes.STRING,
    message: DataTypes.TEXT

}, {

    sequelize,
    modelName: 'logs',
    timestamps: true

});
