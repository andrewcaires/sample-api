import * as http from "http";
import * as https from "https";
import { Server, Socket } from "net";

import { API_HTTP_PORT, API_HTTP_HYBRID } from "./config";
import { crt, key } from "./ssl";

import { Log } from "./helpers/Log";

export const createServer = (handle: http.RequestListener): http.Server | https.Server => {

  if (!crt.http || !key.http) {

    const server = http.createServer(handle);

    server.listen(API_HTTP_PORT, () => Log.info(`Server started on port ${API_HTTP_PORT}`));

    return server;
  }

  const http_server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {

    const port = API_HTTP_PORT == 80 ? ":80" : "";

    res.writeHead(301, { "Location": "https://" + req.headers["host"] + port + req.url });

    res.end();
  });

  const https_server = https.createServer({ key: key.http, cert: crt.http }, handle);

  if (API_HTTP_HYBRID) {

    const server = new Server((socket: Socket) => {

      socket.once("data", (buffer: Buffer) => {

        socket.pause();

        socket.unshift(buffer);

        (buffer[0] === 22 ? https_server : http_server).emit("connection", socket);

        process.nextTick(() => socket.resume());
      });
    });

    server.listen(API_HTTP_PORT, () => Log.info(`Server started on port ${API_HTTP_PORT}`));

    return https_server;
  }

  if (API_HTTP_PORT == 443) {

    http_server.listen(80, () => Log.info("Server started on port 80"));
  }

  https_server.listen(API_HTTP_PORT, () => Log.info(`Server started on port ${API_HTTP_PORT}`));

  return https_server;
};
