import { Group, GroupRoute, Route, UserGroup, UserRoute } from '../models';

export class Permission {

    static allPermission(id: number, type: string): Promise<string[]> {

        const permissions: string[] = [];

        return new Promise<string[]>((resolve, reject) => {

            Route.findAll({

                where: { type, state: true },

                include: [{

                    model: GroupRoute,
                    required: true,

                    include: [{

                        model: Group,
                        required: true,
                        where: { state: true },

                        include: [{

                            model: UserGroup,
                            required: true,
                            where: { userId: id }

                        }]

                    }]

                }]

            }).then((routes) => {

                permissions.push(...routes.map((route) => route.permission));

                Route.findAll({

                    where: { type, state: true },

                    include: [{

                        model: UserRoute,
                        required: true,
                        where: { userId: id },

                    }]

                }).then((routes) => {

                    permissions.push(...routes.map((route) => route.permission));

                    return resolve(permissions);

                }).catch(reject);

            }).catch(reject);
        });
    }

    static isPermission(id: number, path: string, type: string): Promise<boolean> {

        return new Promise<boolean>((resolve, reject) => {

            Route.findAll({

                where: { type, state: true },

                include: [{

                    model: GroupRoute,
                    required: true,

                    include: [{

                        model: Group,
                        required: true,
                        where: { state: true },

                        include: [{

                            model: UserGroup,
                            required: true,
                            where: { userId: id }

                        }]

                    }]

                }]

            }).then((routes) => {

                if (routes.some((route) => route.permission == path)) {

                    return resolve(true);
                }

                Route.findAll({

                    where: { type, state: true },

                    include: [{

                        model: UserRoute,
                        required: true,
                        where: { userId: id },

                    }]

                }).then((routes) => {

                    return resolve(routes.some((route) => route.permission == path));

                }).catch(reject);

            }).catch(reject);
        });
    }
}
