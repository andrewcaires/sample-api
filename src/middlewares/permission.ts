import { NextFunction, Request, Response } from 'express';

import { Group, GroupRoute, Route, UserGroup, UserRoute } from '../bin/models';

import { Log } from '../helpers/Log';
import { Responses } from '../helpers/Responses';

import { RequestUser } from './auth';

const isPermission = (id: number, path: string): Promise<boolean> => {

    return new Promise<boolean>((resolve, reject) => {

        Route.findAll({

            where: {state: true},

            include: [{

                model: GroupRoute,
                required: true,

                include: [{

                    model: Group,
                    required: true,
                    where: {state: true},

                    include: [{

                        model: UserGroup,
                        required: true,
                        where: {userId: id}

                    }]

                }]

            }]

        }).then((routes) => {

            if (routes.map((route) => route.permission).indexOf(path) >= 0) {

                return resolve(true);
            }

            Route.findAll({

                where: {state: true},

                include: [{

                    model: UserRoute,
                    required: true,
                    where: {userId: id},

                }]

            }).then((routes) => {

                return resolve(routes.map((route) => route.permission).indexOf(path) >= 0);

            }).catch(reject);

        }).catch(reject);
    });
}

export const permission = (path: string) => {

    return (req: Request, res: Response, next: NextFunction) => {

        const request = req as RequestUser;

        if (!request.user) {

            return Responses.unauthorized(res, 'Access denied');
        }

        isPermission(request.user.id, path).then((allowed) => {

            if (!allowed) {

                return Responses.error(res, 'Unauthorized access');
            }

            next();

        }).catch((error) => {

            Log.error('permission -> ' + error.message);

            return Responses.error(res, 'Internal Server Error');
        });
    }
}
