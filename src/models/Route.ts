import { DataTypes, Model } from 'sequelize';

import { GroupRoute } from './GroupRoute';
import { UserRoute } from './UserRoute';

import { sequelize } from '../bin/sequelize';

export class Route extends Model {

    public id!: number;
    public name!: string;
    public permission!: string;
    public state!: boolean;
    public users_routes!: UserRoute[];
    public groups_routes!: GroupRoute[];
}

Route.init({

    name: DataTypes.STRING,
    permission: DataTypes.STRING,
    state: DataTypes.BOOLEAN,

}, {

    sequelize,
    modelName: 'route',
    timestamps: false

});
