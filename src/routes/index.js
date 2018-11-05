import { Router } from 'express';

import user from '../services/user';

const router = Router();

router.get('/verify', user.verify);

export default router;
