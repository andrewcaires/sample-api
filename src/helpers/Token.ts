import jwt from 'jsonwebtoken';

import { Utils } from '../helpers/Utils';

import { API_TOKEN_SECRET, API_TOKEN_TIME } from "../bin/config";
import { User } from "../bin/models";
import { crt, key } from '../bin/ssl';

import { Log } from '../helpers/Log';

interface ResponseToken {

    user?: User,
    error?: string
}

export class Token {

    static check(token: string): Promise<ResponseToken> {

        return new Promise<ResponseToken>((resolve) => {

            if (!token) {

                return resolve({error: 'Invalid token'});
            }

            if (token.split('.').length < 3) {

                return resolve({error: 'Invalid token'});
            }

            const date = new Date();
            const time = date.getTime();

            const secret = crt ? crt : API_TOKEN_SECRET;

            if (!secret) {

                return resolve({error: 'Invalid Secret'});
            }

            jwt.verify(token, secret, (err, decoded) => {
    
                if (err) {

                    return resolve({error: 'Invalid Token'});
                }

                if (decoded && decoded.id) {

                    User.findOne({

                        where: {id: decoded.id},

                    }).then((user) => {

                        if (!user) {

                            return resolve({error: 'Access denied'});
                        }

                        if (!user.state) {

                            return resolve({error: 'Access denied'});
                        }

                        if (time > user.timestamp) {

                            return resolve({error: 'Expired token'});
                        }

                        if (decoded.secret != user.secret) {

                            return resolve({error: 'Access denied'});
                        }

                        user.timestamp = time + ( API_TOKEN_TIME * 60000 );

                        user.save();

                        return resolve({user});

                    }).catch((error) => {

                        Log.error('check -> ' + error.message);

                        return resolve({error: 'Internal Server Error'});
                    });

                } else {

                    return resolve({error: 'Access denied'});
                }
            });
        });
    }

    static create(user: User): Promise<string> {

        const data = {id: user.id, secret: Utils.hash()};

        return new Promise<string>((resolve) => {

            const date = new Date();
            const time = date.getTime();

            const secret = key ? key : API_TOKEN_SECRET;

            if (!secret) {

                return resolve('');
            }

            jwt.sign(data, secret, {algorithm: 'RS256'}, (err, token) => {

                if (!err && token) {

                    user.secret = data.secret;
                    user.timestamp = time + ( API_TOKEN_TIME * 60000 );

                    user.save();

                    return resolve(token);
                }

                return resolve('');
            });
        });
    }
}
