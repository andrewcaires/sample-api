import { Router } from 'express';

import auth from './routes/auth';
import groups from './routes/groups';
import permission from './routes/permission';
import users from './routes/users';

export const router = Router();

router.use('/v1/auth', auth);
router.use('/v1/groups', groups);
router.use('/v1/permission', permission);
router.use('/v1/users', users);
