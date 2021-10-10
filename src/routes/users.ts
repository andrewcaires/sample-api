import { Router } from 'express';

import { add, all, del, get, groupsAll, groupsSet, routesAll, routesSet, set } from '../controllers/users';

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

router.route('/groups/:id')

    .get(permission('users.read'), groupsAll)

    .put(permission('users.write'), groupsValidation, groupsSet);

router.route('/routes/:id')

    .get(permission('users.read'), routesAll)

    .put(permission('users.write'), routesValidation, routesSet);

export default router;
