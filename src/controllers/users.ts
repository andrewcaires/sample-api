import { Request, Response } from 'express';

import { Group, Route, User, UserGroup, UserRoute } from '../models';

import { Log } from '../helpers/Log';
import { Responses } from '../helpers/Responses';
import { Utils } from '../helpers/Utils';

const attributes = ['id', 'name', 'email', 'username', 'description', 'state'];

export const add = (req: Request, res: Response) => {

    req.body.password = Utils.md5(req.body.password);

    User.create(req.body).then((user) => {

        return Responses.data(res, 'OK', Utils.filter(attributes, user.toJSON()));

    }).catch((error) => {

        Log.error(error.message, 'users.add');

        return Responses.error(res, 'Internal Server Error');
    });
}

export const all = (req: Request, res: Response) => {

    User.findAll({

        attributes

    }).then((users) => {

        return Responses.data(res, 'OK', users);

    }).catch((error) => {

        Log.error(error.message, 'users.all');

        return Responses.error(res, 'Internal Server Error');
    });
}

export const del = (req: Request, res: Response) => {

    const { id } = req.params;

    User.destroy({

        where: { id }

    }).then((count) => {

        if (!count) {

            return Responses.notfound(res, 'User not found');
        }

        return Responses.success(res, 'OK');

    }).catch((error) => {

        Log.error(error.message, 'users.del');

        return Responses.error(res, 'Internal Server Error');
    });
}

export const get = (req: Request, res: Response) => {

    const { id } = req.params;

    User.findByPk(id, {

        attributes

    }).then((user) => {

        if (!user) {

            return Responses.notfound(res, 'User not found');
        }

        return Responses.data(res, 'OK', user);

    }).catch((error) => {

        Log.error(error.message, 'users.get');

        return Responses.error(res, 'Internal Server Error');
    });
}

export const groupsAll = (req: Request, res: Response) => {

    const { id } = req.params;

    UserGroup.findAll({

        where: { userId: id },

        include: [{

            model: Group,
            required: true,

        }]

    }).then((groups) => {

        return Responses.data(res, 'OK', groups.map((group) => group.group));

    }).catch((error) => {

        Log.error(error.message, 'users.groupsAll');

        return Responses.error(res, 'Internal Server Error');
    });
}

export const groupsSet = (req: Request, res: Response) => {

    const { id } = req.params;
    const { groups } = req.body;

    User.findByPk(id, {

        attributes: ['id']

    }).then(async (user) => {

        if (!user) {

            return Responses.notfound(res, 'User not found');
        }

        await UserGroup.destroy({ where: { userId: user.id } });

        if (groups) {

            let count = 0;

            for (let i = 0; i < groups.length; i++) {

                count = await Group.count({ where: { id: groups[i] } });

                if (count) {

                    await UserGroup.create({ userId: user.id, groupId: groups[i] });
                }
            }
        }

        return Responses.success(res, 'OK');

    }).catch((error) => {

        Log.error(error.message, 'users.groupsSet');

        return Responses.error(res, 'Internal Server Error');
    });
}

export const routesAll = (req: Request, res: Response) => {

    const { id } = req.params;

    UserRoute.findAll({

        where: { userId: id },

        include: [{

            model: Route,
            required: true,

        }]

    }).then((routes) => {

        return Responses.data(res, 'OK', routes.map((route) => route.route));

    }).catch((error) => {

        Log.error(error.message, 'users.routesAll');

        return Responses.error(res, 'Internal Server Error');
    });
}

export const routesSet = (req: Request, res: Response) => {

    const { id } = req.params;
    const { routes } = req.body;

    User.findByPk(id, {

        attributes: ['id']

    }).then(async (user) => {

        if (!user) {

            return Responses.notfound(res, 'User not found');
        }

        await UserRoute.destroy({ where: { userId: user.id } });

        if (routes) {

            let count = 0;

            for (let i = 0; i < routes.length; i++) {

                count = await Route.count({ where: { id: routes[i] } });

                if (count) {

                    await UserRoute.create({ userId: user.id, routeId: routes[i] });
                }
            }
        }

        return Responses.success(res, 'OK');

    }).catch((error) => {

        Log.error(error.message, 'users.routesSet');

        return Responses.error(res, 'Internal Server Error');
    });
}

export const set = (req: Request, res: Response) => {

    const { id } = req.params;

    if (req.body.password) {

        req.body.password = Utils.md5(req.body.password);
    }

    User.update(req.body, {

        where: { id }

    }).then(([count]) => {

        if (!count) {

            return Responses.notfound(res, 'User not changed');
        }

        return Responses.success(res, 'OK');

    }).catch((error) => {

        Log.error(error.message, 'users.set');

        return Responses.error(res, 'Internal Server Error');
    });
}
