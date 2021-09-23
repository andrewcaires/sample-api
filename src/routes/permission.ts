import { Router } from 'express';

import { all } from '../controllers/permission';

import { auth } from '../middlewares/auth';

const router = Router();

router.use(auth);

router.get('/', all);

export default router;
