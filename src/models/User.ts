import { DataTypes, Model } from 'sequelize';

import { UserGroup } from './UserGroup';
import { UserRoute } from './UserRoute';

import { sequelize } from '../sequelize';

export class User extends Model {

    public id!: number;
    public name!: string;
    public email!: string;
    public username!: string;
    public password!: string;
    public description!: string;
    public secret!: string;
    public timestamp!: number;
    public state!: boolean;
    public users_groups!: UserGroup[];
    public users_routes!: UserRoute[];
}

User.init({

    name: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    description: DataTypes.TEXT,
    secret: DataTypes.STRING,
    timestamp: DataTypes.BIGINT,
    state: DataTypes.BOOLEAN,

}, {

    sequelize,
    modelName: 'user'

});
