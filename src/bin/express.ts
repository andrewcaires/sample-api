import cors from 'cors';
import express from 'express';
import { existsSync } from 'fs';
import * as http from 'http';
import * as https from 'https';

import { API_HTTP_PORT, API_HTTP_PUBLIC, API_HTTP_CROSS } from './config';
import { routes } from './routes';
import { crt, key } from './ssl';

import { Log } from '../helpers/Log';
import { Responses } from '../helpers/Responses';

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.disable('x-powered-by');

const createServer = () => {

    if (!crt.http || !key.http) {

        return http.createServer(app);
    }

    return https.createServer({ key: key.http, cert: crt.http }, app);
}

export const listen = (): void => {

    if (API_HTTP_CROSS) {

        app.use(cors());
    }

    routes(app);

    app.all('/api/*', (req: express.Request, res: express.Response) => {

        return Responses.notfound(res, 'Invalid API');
    });

    if (API_HTTP_PUBLIC) {

        staticFileServer();
    }

    if (crt && key && API_HTTP_PORT == 443) {

        redirectServer();
    }

    server.listen(API_HTTP_PORT, () => Log.info(`Server started on port ${API_HTTP_PORT}`));
}

const staticFileServer = () => {

    if (existsSync(API_HTTP_PUBLIC)) {

        app.use(express.static(API_HTTP_PUBLIC));
    }

    app.get('*', (req: express.Request, res: express.Response) => {

        if (!existsSync(API_HTTP_PUBLIC)) {

            return Responses.error(res, 'File "index.html" not found');
        }

        res.sendFile(API_HTTP_PUBLIC + '/index.html');
    });
}

const redirectServer = (): void => {

    http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {

        res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });

        res.end();

    }).listen(80, () => Log.info(`Server started on port 80`));
}

export const server = createServer();
