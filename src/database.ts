import { Group, GroupRoute, Route, User, UserGroup } from "./models";

export const setup = async () => {

    const users = await User.count();

    if (users == 0) {

        const user = await User.create({
            name: 'Admin',
            email: 'test@test.test',
            username: 'admin',
            password: 'e10adc3949ba59abbe56e057f20f883e',
            description: '',
            state: 1
        });

        const groups = await Group.count();

        if (groups == 0) {

            const group = await Group.create({
                name: 'Admin',
                state: 1
            });

            UserGroup.create({ userId: user.id, groupId: group.id });

            const routes = await Route.count();

            if (routes == 0) {

                ['ADD', 'ALL', 'DEL', 'GET', 'SET'].forEach(async (value) => {

                    const name = 'Users ' + value;
                    const permission = 'users.' + value.toLowerCase();

                    const route = await Route.create({ name, permission, type: 'api', state: 1 });

                    GroupRoute.create({ groupId: group.id, routeId: route.id });
                });
            }
        }
    }
}
