import { API_WEBSOCKET_START } from "./config";
import { setup } from "./database";
import { app } from "./express";
import { sequelize } from "./sequelize";
import { createServer } from "./server";
import { startSocket } from "./websocket";

export const initialize = (): void => {

  sequelize.sync().then(() => {

    setup();

    if (API_WEBSOCKET_START) {

      startSocket(server);
    }
  });
};

export const server = createServer(app);
