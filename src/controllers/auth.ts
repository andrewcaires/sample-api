import { filterObject, sleep } from '@andrewcaires/utils.js';
import { Request, Response } from 'express';

import { User } from '../models';

import { Log } from '../helpers/Log';
import { Responses } from '../helpers/Responses';
import { Permission } from '../helpers/Permission';
import { Token } from '../helpers/Token';
import { Utils } from '../helpers/Utils';

import { API_AUTH_SLEEP } from '../config';

const attributes = ['id', 'name', 'email', 'username'];

export const login = (req: Request, res: Response) => {

    const { username, password } = req.body;

    if (!username || !password) {

        return Responses.error(res, 'Invalid parameters');
    }

    sleep(API_AUTH_SLEEP).then(() => {

        User.findOne({

            where: { username }

        }).then((user) => {

            if (!user) {

                return Responses.notfound(res, 'User not found');
            }

            if (user.password != Utils.md5(password)) {

                return Responses.error(res, 'Invalid password');
            }

            if (!user.state) {

                return Responses.error(res, 'User is disabled');
            }

            Token.create(user).then((token) => {

                return Responses.data(res, { token });

            }).catch((error) => {

                return Responses.error(res, error);
            });

        }).catch((error) => {

            Log.error(error.message, 'auth.login');

            return Responses.error(res, 'Internal Server Error');
        });
    });
}

export const logout = (req: Request, res: Response) => {

    const auth = req.auth;

    if (!auth) {

        return Responses.unauthorized(res, 'Access denied');
    }

    Token.destroy(auth).then(() => {

        return Responses.success(res, 'Disconcerted');

    }).catch(() => {

        return Responses.error(res, 'Internal Server Error');
    });
}

export const user = (req: Request, res: Response) => {

    const user = req.user;

    if (!user) {

        return Responses.unauthorized(res, 'Access denied');
    }

    Permission.allPermission(user.id).then((permissions) => {

        const filter = filterObject(attributes, user.toJSON());

        return Responses.data(res, { ...filter, permissions });

    }).catch((error) => {

        Log.error(error.message, 'auth.user');

        return Responses.error(res, 'Internal Server Error');
    });
}
