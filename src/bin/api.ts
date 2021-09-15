import { API_WEBSOCKET_START } from './config';
import { listen } from './express';
import { sequelize } from './sequelize';
import { start } from './websocket';

export const initialize = () => {

    sequelize.sync().then(() => {

        listen();

        if (API_WEBSOCKET_START) {

            start();
        }
    });
}
