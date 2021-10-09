import { Router } from 'express';

import { add, all, del, get, groups, routes, set } from '../controllers/users';

import { auth } from '../middlewares/auth';
import { permission } from '../middlewares/permission';

import { createValidation, groupsValidation, routesValidation, updateValidation } from '../validation/user';

const router = Router();

router.use(auth);

router.get('/', permission('users.read'), all);

router.post('/', permission('users.write'), createValidation, add);

router.route('/:id')

    .get(permission('users.read'), get)

    .put(permission('users.write'), updateValidation, set)

    .delete(permission('users.write'), del);

router.put('/groups/:id', permission('users.write'), groupsValidation, groups);

router.put('/routes/:id', permission('users.write'), routesValidation, routes);

export default router;
