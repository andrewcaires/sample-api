import { Request, Response } from 'express';

import { User } from '../models';

import { Log } from '../helpers/Log';
import { Responses } from '../helpers/Responses';
import { Token } from '../helpers/Token';
import { Utils } from '../helpers/Utils';

const attributes = ['id', 'name', 'email', 'username'];

export const login = (req: Request, res: Response) => {

    const { username, password } = req.body;

    if (!username || !password) {

        return Responses.error(res, 'Invalid parameters');
    }

    User.findOne({

        where: { username }

    }).then((user) => {

        if (!user) {

            return Responses.notfound(res, 'User not found');
        }

        if (!user.state) {

            return Responses.error(res, 'User is disabled');
        }

        if (user.password != Utils.md5(password)) {

            return Responses.error(res, 'Invalid password');
        }

        Token.create(user).then((token) => {

            if (token.length) {

                return Responses.data(res, 'OK', token);
            }

            return Responses.error(res, 'Internal Server Error');
        });

    }).catch((error) => {

        Log.error('login -> ' + error.message);

        return Responses.error(res, 'Internal Server Error');
    });
}

export const logout = (req: Request, res: Response) => {

    const user = req.user;

    if (!user) {

        return Responses.unauthorized(res, 'Access denied');
    }

    user.secret = '';
    user.timestamp = 0;

    user.save();

    return Responses.success(res, 'Disconcerted');
}

export const user = (req: Request, res: Response) => {

    const user = req.user;

    if (!user) {

        return Responses.unauthorized(res, 'Access denied');
    }

    return Responses.data(res, 'OK', Utils.filter(attributes, user.toJSON()));
}
