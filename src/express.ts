import cors from 'cors';
import express from 'express';
import { existsSync } from 'fs';

import { API_HTTP_CROSS, API_HTTP_PUBLIC } from './config';
import { router } from './router';

import { Responses } from './helpers/Responses';

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.disable('x-powered-by');

if (API_HTTP_CROSS) {

    app.use(cors());
}

app.use('/api', router);

app.all('/api/*', (req: express.Request, res: express.Response) => {

    return Responses.notfound(res, 'Invalid API');
});

if (API_HTTP_PUBLIC) {

    if (existsSync(API_HTTP_PUBLIC)) {

        app.use(express.static(API_HTTP_PUBLIC));
    }

    app.get('*', (req: express.Request, res: express.Response) => {

        if (!existsSync(API_HTTP_PUBLIC)) {

            return Responses.notfound(res, 'File "index.html" not found');
        }

        res.sendFile(API_HTTP_PUBLIC + '/index.html');
    });
}
