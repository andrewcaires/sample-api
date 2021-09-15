import WebSocket from 'ws';

import { API_WEBSOCKET_START } from './config';
import { User } from './models';
import { server } from './express';

import { Log } from '../helpers/Log';
import { Token } from '../helpers/Token';

interface WebSocketEvent {

    type: string;
    message: string;
}

const execEvent = (ws: WebSocket, user: User, message: string) => {

    try {

        const event = JSON.parse(message) as WebSocketEvent;

        wss.emit('ws.', event.type, ws, user, event.message);

    } catch (ex: any) {

        const error: Error = ex;

        Log.error('execEvent -> ' + error.message);
    }
}

export const start = () => {

    wss.on('connection', (ws: WebSocket) => {

        let user: User;

        ws.on('message', (message: string) => {

            if (user) {

                execEvent(ws, user, message);

            } else {

                Token.check(message.toString()).then((token) => {

                    if (!token.user) {

                        ws.close();

                    } else {

                        user = token.user;
                    }
                });
            }
        });

        setTimeout(() => {

            if (!user) {

                ws.close()
            }

        }, 2000);

        ws.on('close', () => {

            wss.emit('close', ws);
        });
    });
}

const verifyClient = (info: any, callback: any) => {

    return callback(API_WEBSOCKET_START);
}

export const wss = new WebSocket.Server({server, verifyClient});
