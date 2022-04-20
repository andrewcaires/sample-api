import * as http from "http";
import * as https from "https";
import WebSocket from "ws";

import { API_WEBSOCKET_START } from "./config";
import { User } from "./models";

import { Log } from "./helpers/Log";

interface WebSocketEvent {

  type: string;
  message: string;
}

const execEvent = (wss: WebSocket.Server, ws: WebSocket, user: User, message: string): void => {

  try {

    const event = JSON.parse(message) as WebSocketEvent;

    wss.emit("ws.", event.type, ws, user, event.message);

  } catch (ex: any) {

    const error: Error = ex;

    Log.error("execEvent -> " + error.message);
  }
};

export const startSocket = (server: http.Server | https.Server): WebSocket.Server => {

  const wss = new WebSocket.Server({ server, verifyClient });

  wss.on("connection", (ws: WebSocket) => {

    let user: User;

    ws.on("message", (message: string) => {

      if (user) {

        execEvent(wss, ws, user, message);

      } else {

        // Token.check(message.toString()).then((token) => {

        //   if (!token.user) {

        ws.close();

        //   } else {

        //     user = token.user;
        //   }
        // });
      }
    });

    setTimeout(() => {

      if (!user) {

        ws.close();
      }

    }, 2000);

    ws.on("close", () => {

      wss.emit("close", ws);
    });
  });

  return wss;
};

const verifyClient = (info: any, callback: any) => {

  return callback(API_WEBSOCKET_START);
};
