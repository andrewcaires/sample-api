import {

  App,

  AuthController,
  GroupController,
  GroupRouteController,
  LogsController,
  RouteController,
  UserController,
  UserGroupController,

} from "@andrewcaires/api";

import { SampleController } from "./controllers";

(async () => {

  const app = new App(
    [

      new AuthController("/auth"),
      new GroupController("/groups"),
      new GroupRouteController("/groups"),
      new LogsController("/logs"),
      new RouteController("/routes"),
      new UserController("/users"),
      new UserGroupController("/users"),

      new SampleController("/sample"),

    ]
  );

  await app.listen();

})();
