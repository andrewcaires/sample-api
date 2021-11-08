import { NextFunction, Request, Response } from 'express';

import { Auth, User } from "../models";

import { Responses } from '../helpers/Responses';
import { Token } from '../helpers/Token';

import { API_TOKEN_HEADER, API_TOKEN_LIFETIME } from '../config';

declare global {

    namespace Express {

        interface Request {

            auth: Auth | undefined;
            user: User | undefined;
        }
    }
}

export const auth = (req: Request, res: Response, next: NextFunction) => {

    const token = req.get(API_TOKEN_HEADER) || '';

    Token.check(token).then((token) => {

        const auth = token.auth;

        req.auth = auth;
        req.user = token.user;

        const useragent = req.get('User-Agent');

        if (useragent) {

            auth.useragent = useragent;
        }

        const time = Date.now();

        auth.timestamp = time + (API_TOKEN_LIFETIME * 60000);

        auth.save().then(() => {

            return next();

        }).catch(() => {

            return Responses.error(res, 'Internal Server Error');
        });

    }).catch((error) => {

        return Responses.error(res, error);
    });
}
