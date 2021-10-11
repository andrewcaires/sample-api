import { Request, Response } from 'express';

import { Route } from '../models';

import { Log } from '../helpers/Log';
import { Responses } from '../helpers/Responses';

export const add = (req: Request, res: Response) => {

    Route.create(req.body).then((route) => {

        return Responses.data(res, 'OK', route.toJSON());

    }).catch((error) => {

        Log.error(error.message, 'routes.add');

        return Responses.error(res, 'Internal Server Error');
    });
}

export const all = (req: Request, res: Response) => {

    Route.findAll().then((routes) => {

        return Responses.data(res, 'OK', routes);

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

            return Responses.notfound(res, 'Route not found');
        }

        return Responses.success(res, 'OK');

    }).catch((error) => {

        Log.error(error.message, 'routes.del');

        return Responses.error(res, 'Internal Server Error');
    });
}

export const get = (req: Request, res: Response) => {

    const { id } = req.params;

    Route.findByPk(id).then((route) => {

        if (!route) {

            return Responses.notfound(res, 'Route not found');
        }

        return Responses.data(res, 'OK', route);

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

            return Responses.success(res, 'Route not changed');
        }

        return Responses.success(res, 'OK');

    }).catch((error) => {

        Log.error(error.message, 'routes.set');

        return Responses.error(res, 'Internal Server Error');
    });
}
