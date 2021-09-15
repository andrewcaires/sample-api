import { Router } from 'express';

import { add, all, del, get, set } from '../controllers/users';

import { auth } from '../middlewares/auth';
import { permission } from '../middlewares/permission';

import { createValidation, updateValidation } from '../validation/user';

const router = Router();

router.use(auth);

router.get('/', permission('users.all'), all);

router.post('/', permission('users.add'), createValidation, add);

router.route('/:id')

    .get(permission('users.get'), get)

    .put(permission('users.set'), updateValidation, set)

    .delete(permission('users.del'), del);

export default router;
