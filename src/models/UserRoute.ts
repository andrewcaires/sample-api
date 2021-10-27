import { Model } from 'sequelize';

import { User } from './User';
import { Route } from './Route';

import { sequelize } from '../sequelize';

export class UserRoute extends Model {

    public userId!: number;
    public routeId!: number;
    public user!: User;
    public route!: Route;
}

UserRoute.init({}, {

    sequelize,
    modelName: 'users_routes'

});

UserRoute.removeAttribute('id');
