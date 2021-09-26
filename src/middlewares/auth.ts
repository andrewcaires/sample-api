import { NextFunction, Request, Response } from 'express';

import { User } from "../models";

import { Responses } from '../helpers/Responses';
import { Token } from '../helpers/Token';

import { API_TOKEN_HEADER } from '../config';

export interface RequestUser extends Request {

    user: User;
}

export const auth = (req: Request, res: Response, next: NextFunction) => {

    const request = req as RequestUser;

    const token = request.headers[API_TOKEN_HEADER]?.toString() || '';

    Token.check(token).then((token) => {

        if (token.error) {

            return Responses.error(res, token.error);
        }

        if (!token.user) {

            return Responses.notfound(res, 'User not found');
        }

        request.user = token.user;

        return next();
    });
}
