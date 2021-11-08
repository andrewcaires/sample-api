import { Request, Response } from 'express';

import { Route } from '../models';

import { Log } from '../helpers/Log';
import { Responses } from '../helpers/Responses';

export const add = (req: Request, res: Response) => {

    Route.create(req.body).then((record) => {

        return Responses.data(res, record.toJSON());

    }).catch((error) => {

        Log.error(error.message, 'routes.add');

        return Responses.error(res, 'Internal Server Error');
    });
}

export const all = (req: Request, res: Response) => {

    Route.findAll().then((records) => {

        return Responses.list(res, records);

    }).catch((error) => {

        Log.error(error.message, 'routes.all');

        return Responses.error(res, 'Internal Server Error');
    });
}

export const del = (req: Request, res: Response) => {

    const { id } = req.params;

    Route.destroy({

        where: { id }

    }).then((count) => {

        if (!count) {

            return Responses.notfound(res, 'Record not found');
        }

        return Responses.success(res, 'OK');

    }).catch((error) => {

        Log.error(error.message, 'routes.del');

        return Responses.error(res, 'Internal Server Error');
    });
}

export const get = (req: Request, res: Response) => {

    const { id } = req.params;

    Route.findByPk(id).then((record) => {

        if (!record) {

            return Responses.notfound(res, 'Record not found');
        }

        return Responses.data(res, record.toJSON());

    }).catch((error) => {

        Log.error(error.message, 'routes.get');

        return Responses.error(res, 'Internal Server Error');
    });
}

export const set = (req: Request, res: Response) => {

    const { id } = req.params;

    Route.update(req.body, {

        where: { id }

    }).then(([count]) => {

        if (!count) {

            return Responses.success(res, 'Record not changed');
        }

        return Responses.success(res, 'OK');

    }).catch((error) => {

        Log.error(error.message, 'routes.set');

        return Responses.error(res, 'Internal Server Error');
    });
}
