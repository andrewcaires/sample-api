import { NextFunction, Request, Response } from 'express';

import { Log } from '../helpers/Log';
import { Permission } from '../helpers/Permission';
import { Responses } from '../helpers/Responses';

export const permission = (path: string) => {

    return (req: Request, res: Response, next: NextFunction) => {

        const user = req.user;

        if (!user) {

            return Responses.unauthorized(res, 'Access denied');
        }

        Permission.isPermission(user.id, path).then((allowed) => {

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
