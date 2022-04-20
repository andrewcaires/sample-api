import { Auth } from "./Auth";
import { Group } from "./Group";
import { Logs } from "./Logs";
import { Route } from "./Route";
import { GroupRoute } from "./GroupRoute";
import { User } from "./User";
import { UserGroup } from "./UserGroup";

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

export { Auth, Group, GroupRoute, Logs, Route, User, UserGroup };
