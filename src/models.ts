import { Auth } from './models/Auth';
import { Group } from './models/Group';
import { Logs } from './models/Logs';
import { Route } from './models/Route';
import { GroupRoute } from './models/GroupRoute';
import { User } from './models/User';
import { UserGroup } from './models/UserGroup';
import { UserRoute } from './models/UserRoute';

User.hasMany(Auth);
Auth.belongsTo(User);

Group.hasMany(GroupRoute);
GroupRoute.belongsTo(Group);

Route.hasMany(GroupRoute);
GroupRoute.belongsTo(Route);

User.hasMany(UserGroup);
UserGroup.belongsTo(User);

Group.hasMany(UserGroup);
UserGroup.belongsTo(Group);

User.hasMany(UserRoute);
UserRoute.belongsTo(User);

Route.hasMany(UserRoute);
UserRoute.belongsTo(Route);

export { Auth, Group, GroupRoute, Logs, Route, User, UserGroup, UserRoute };
