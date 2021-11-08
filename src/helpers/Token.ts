import jwt from 'jsonwebtoken';

import { API_TOKEN_LIFETIME } from "../config";
import { Auth, User } from "../models";
import { crt, key } from '../ssl';

import { Log } from '../helpers/Log';
import { Utils } from '../helpers/Utils';

interface ResponseToken {

    auth: Auth,
    user: User,
}

export class Token {

    static check(token: string): Promise<ResponseToken> {

        return new Promise<ResponseToken>((resolve, reject) => {

            if (!token) {

                return reject('Access denied');
            }

            if (token.split('.').length < 3) {

                return reject('Invalid token');
            }

            if (!crt.token) {

                return reject('Invalid Secret');
            }

            jwt.verify(token, crt.token, (error, decoded) => {

                if (error) {

                    return reject('Invalid token');
                }

                if (decoded && decoded.id && decoded.secret) {

                    User.findOne({

                        where: { id: decoded.id }

                    }).then((user) => {

                        if (!user || !user.state) {

                            return reject('Access denied');
                        }

                        Auth.findOne({

                            where: { logout: null, secret: decoded.secret, userId: user.id }

                        }).then((auth) => {

                            if (!auth) {

                                return reject('Access denied');
                            }

                            const time = Date.now();

                            if (time > auth.timestamp) {

                                return reject('Expired token');
                            }

                            return resolve({ auth, user });

                        }).catch((error) => {

                            Log.error(error.message, 'token');

                            return reject('Internal Server Error');
                        });

                    }).catch((error) => {

                        Log.error(error.message, 'token');

                        return reject('Internal Server Error');
                    });

                } else {

                    return reject('Access denied');
                }
            });
        });
    }

    static create(user: User): Promise<string> {

        return new Promise<string>((resolve, reject) => {

            if (!key.token) {

                return reject('Invalid Secret');
            }

            const id = user.id;
            const secret = Utils.hash();

            jwt.sign({ id, secret }, key.token, { algorithm: 'RS256' }, (err, token) => {

                if (!err && token) {

                    const login = Date.now();
                    const timestamp = login + (API_TOKEN_LIFETIME * 60000);

                    Auth.create({

                        login, secret, timestamp, userId: id,

                    }).then((auth) => {

                        return resolve(token);

                    }).catch((error) => {

                        Log.error(error.message, 'token');

                        return reject('Internal Server Error');
                    });

                } else {

                    return reject('Internal Server Error');
                }
            });
        });
    }

    static destroy(auth: Auth): Promise<void> {

        return new Promise<void>((resolve, reject) => {

            auth.logout = Date.now();
            auth.timestamp = auth.logout;

            auth.save().then(() => {

                return resolve();

            }).catch(() => {

                return reject();
            });
        });
    }
}
