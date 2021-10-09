import { Router } from 'express';

import { add, all, del, get, groups, routes, set } from '../controllers/users';

import { auth } from '../middlewares/auth';
import { permission } from '../middlewares/permission';

import { createValidation, groupsValidation, routesValidation, updateValidation } from '../validation/user';

const router = Router();

router.use(auth);

router.get('/', permission('users.user'), all);

router.post('/', permission('users.admin'), createValidation, add);

router.route('/:id')

    .get(permission('users.user'), get)

    .put(permission('users.admin'), updateValidation, set)

    .delete(permission('users.admin'), del);

router.put('/groups/:id', permission('users.admin'), groupsValidation, groups);

router.put('/routes/:id', permission('users.admin'), routesValidation, routes);

export default router;
