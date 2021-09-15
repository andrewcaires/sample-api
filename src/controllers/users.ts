import { Request, Response } from 'express';

import { User } from '../bin/models';

import { Log } from '../helpers/Log';
import { Responses } from '../helpers/Responses';
import { Utils } from '../helpers/Utils';

const attributes = ['id', 'name', 'email', 'username', 'state'];

export const add = (req: Request, res: Response) => {

    req.body.password = Utils.md5(req.body.password);

    User.create(req.body).then((user) => {

        return Responses.data(res, 'OK', Utils.filter(attributes, user.toJSON()));

    }).catch((error) => {

        Log.error('add -> ' + error.message);

        return Responses.error(res, 'Internal Server Error');
    });
}

export const all = (req: Request, res: Response) => {

    User.findAll({

        attributes

    }).then((users) => {

        return Responses.data(res, 'OK', users);

    }).catch((error) => {

        Log.error('all -> ' + error.message);

        return Responses.error(res, 'Internal Server Error');
    });
}

export const del = (req: Request, res: Response) => {

    const { id } = req.params;

    User.destroy({

        where: { id: id }

    }).then((count) => {

        if (!count) {

            return Responses.notfound(res, 'User not found');
        }

        return Responses.success(res, 'OK');

    }).catch((error) => {

        Log.error('del -> ' + error.message);

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

        Log.error('get -> ' + error.message);

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

    }).then((count) => {

        if (!count) {

            return Responses.notfound(res, 'User not found');
        }

        return Responses.success(res, 'OK');

    }).catch((error) => {

        Log.error('set -> ' + error.message);

        return Responses.error(res, 'Internal Server Error');
    });
}
