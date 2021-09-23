import { NextFunction, Request, Response } from 'express';

import { Log } from '../helpers/Log';
import { Permission } from '../helpers/Permission';
import { Responses } from '../helpers/Responses';

import { RequestUser } from './auth';

export const permission = (path: string) => {

    return (req: Request, res: Response, next: NextFunction) => {

        const request = req as RequestUser;

        if (!request.user) {

            return Responses.unauthorized(res, 'Access denied');
        }

        Permission.isPermission(request.user.id, path, 'api').then((allowed) => {

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
