import { Express } from 'express';

import auth from './routes/auth';
import permission from './routes/permission';
import users from './routes/users';

export const routes = (app: Express) => {

    app.use('/api/v1/auth', auth);
    app.use('/api/v1/permission', permission);
    app.use('/api/v1/users', users);
}
