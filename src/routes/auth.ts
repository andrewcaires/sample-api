import { Router } from 'express';

import { logged, login, logout } from '../controllers/auth';

import { auth } from '../middlewares/auth';

import { queryValidation } from '../validation/auth';

const router = Router();

router.get('/logged', auth, logged);

router.post('/login', queryValidation, login);

router.get('/logout', auth, logout);

export default router;
