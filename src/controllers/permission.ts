import { Request, Response } from 'express';

import { Log } from '../helpers/Log';
import { Permission } from '../helpers/Permission';
import { Responses } from '../helpers/Responses';

export const all = (req: Request, res: Response) => {

    const user = req.user;

    if (!user) {

        return Responses.unauthorized(res, 'Access denied');
    }

    Permission.allPermission(user.id).then((permissions) => {

        return Responses.data(res, 'OK', permissions);

    }).catch((error) => {

        Log.error('all -> ' + error.message, 'permission');

        return Responses.error(res, 'Internal Server Error');
    });
}
