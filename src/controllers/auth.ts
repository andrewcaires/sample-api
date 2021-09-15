import { Request, Response } from 'express';

import { User } from '../bin/models';

import { Log } from '../helpers/Log';
import { Responses } from '../helpers/Responses';
import { Token } from '../helpers/Token';
import { Utils } from '../helpers/Utils';

import { RequestUser } from '../middlewares/auth';

const attributes = ['id', 'name', 'username', 'state'];

export const logged = (req: Request, res: Response) => {

    const request = req as RequestUser;

    let data: any = {};

    if (request.user) {

        data = request.user.toJSON();
    }

    return Responses.data(res, 'OK', Utils.filter(attributes, data));
}

export const login = (req: Request, res: Response) => {

    const { username, password } = req.body;

    if (!username || !password) {

        return Responses.error(res, 'Invalid parameters');
    }

    User.findOne({

        where: {username}

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

    const request = req as RequestUser;

    const user = request.user;

    if (user) {

        user.secret = '';
        user.timestamp = 0;

        user.save();
    }

    return Responses.success(res, 'Disconcerted');
}
