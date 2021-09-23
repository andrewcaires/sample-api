import { Request, Response } from 'express';

import { Log } from '../helpers/Log';
import { Permission } from '../helpers/Permission';
import { Responses } from '../helpers/Responses';

import { RequestUser } from '../middlewares/auth';

export const all = (req: Request, res: Response) => {

    const request = req as RequestUser;

    const user = request.user;

    Permission.allPermission(user.id, 'app').then((permissions) => {

        return Responses.data(res, 'OK', permissions);

    }).catch((error) => {

        Log.error('all -> ' + error.message);

        return Responses.error(res, 'Internal Server Error');
    });
}
