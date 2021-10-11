import { Request, Response } from 'express';

import { Group, GroupRoute, Route } from '../models';

import { Log } from '../helpers/Log';
import { Responses } from '../helpers/Responses';

export const add = (req: Request, res: Response) => {

    Group.create(req.body).then((group) => {

        return Responses.data(res, 'OK', group.toJSON());

    }).catch((error) => {

        Log.error(error.message, 'groups.add');

        return Responses.error(res, 'Internal Server Error');
    });
}

export const all = (req: Request, res: Response) => {

    Group.findAll().then((groups) => {

        return Responses.data(res, 'OK', groups);

    }).catch((error) => {

        Log.error(error.message, 'groups.all');

        return Responses.error(res, 'Internal Server Error');
    });
}

export const del = (req: Request, res: Response) => {

    const { id } = req.params;

    Group.destroy({

        where: { id }

    }).then((count) => {

        if (!count) {

            return Responses.notfound(res, 'Group not found');
        }

        return Responses.success(res, 'OK');

    }).catch((error) => {

        Log.error(error.message, 'groups.del');

        return Responses.error(res, 'Internal Server Error');
    });
}

export const get = (req: Request, res: Response) => {

    const { id } = req.params;

    Group.findByPk(id).then((group) => {

        if (!group) {

            return Responses.notfound(res, 'Group not found');
        }

        return Responses.data(res, 'OK', group);

    }).catch((error) => {

        Log.error(error.message, 'groups.get');

        return Responses.error(res, 'Internal Server Error');
    });
}

export const routesAll = (req: Request, res: Response) => {

    const { id } = req.params;

    GroupRoute.findAll({

        where: { groupId: id },

        include: [{

            model: Route,
            required: true,

        }]

    }).then((routes) => {

        return Responses.data(res, 'OK', routes.map((route) => route.route));

    }).catch((error) => {

        Log.error(error.message, 'groups.routesAll');

        return Responses.error(res, 'Internal Server Error');
    });
}

export const routesSet = (req: Request, res: Response) => {

    const { id } = req.params;
    const { routes } = req.body;

    Group.findByPk(id, {

        attributes: ['id']

    }).then(async (group) => {

        if (!group) {

            return Responses.notfound(res, 'Group not found');
        }

        const groupId = group.id;

        await GroupRoute.destroy({ where: { groupId } });

        if (routes) {

            let count = 0;

            for (let i = 0; i < routes.length; i++) {

                count = await Route.count({ where: { id: routes[i] } });

                if (count) {

                    await GroupRoute.create({ groupId, routeId: routes[i] });
                }
            }
        }

        return Responses.success(res, 'OK');

    }).catch((error) => {

        Log.error(error.message, 'groups.routesSet');

        return Responses.error(res, 'Internal Server Error');
    });
}

export const set = (req: Request, res: Response) => {

    const { id } = req.params;

    Group.update(req.body, {

        where: { id }

    }).then(([count]) => {

        if (!count) {

            return Responses.success(res, 'Group not changed');
        }

        return Responses.success(res, 'OK');

    }).catch((error) => {

        Log.error(error.message, 'groups.set');

        return Responses.error(res, 'Internal Server Error');
    });
}
